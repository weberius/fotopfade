var map;
let urlroute, urlpoi;

// Abwärtskompatibilität: ?id=name → #/name
(function() {
    const match = (new RegExp('[?|&]id=([^&;]+?)(&|#|;|$)').exec(location.search));
    if (match && match[1]) {
        const id = decodeURIComponent(match[1].replace(/\+/g, '%20'));
        window.location.replace(window.location.pathname + '#/' + id);
    }
})();

window.addEventListener("resize", function() {
  sizeLayerControl();
});

document.getElementById("geschichte-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("geschichteModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("ueber-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("ueberModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("features-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("featuresModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("links-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("linksModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("resources-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("resourcesModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("full-extent-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).show();
  map.fitBounds(routes.getBounds());
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("start-tour-btn").addEventListener("click", function() {
  if (routes.getBounds().isValid()) {
    map.fitBounds(routes.getBounds());
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).hide();
});

/**************************************************************************************************/
// FILL TABLE
/**************************************************************************************************/

let legendTableInitialized = false;

document.getElementById("legend-btn").addEventListener("click", function() {

    var urldata = "service/data/" + namespace + ".json";

    var legendModalEl = document.getElementById("legendModal");

    if (!legendTableInitialized) {
        legendModalEl.addEventListener("shown.bs.modal", function handler() {
            legendModalEl.removeEventListener("shown.bs.modal", handler);
            var tableEl = document.getElementById("culturalpath");
            if (!tableEl) {
                console.error("legend-btn: #culturalpath not found in DOM");
                return;
            }
            legendTableInitialized = true;
            new DataTable(tableEl, {
                ajax: { url: urldata, dataSrc: "data" },
                searching: false,
                paging: false,
                ordering: false,
                info: false,
                columns: [
                    { data: "name" },
                    { data: "time" },
                    { data: "distance" }
                ]
            });
        });
    }

    bootstrap.Modal.getOrCreateInstance(legendModalEl).show();
    bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
    return false;
});

function sizeLayerControl() {
  document.querySelector(".leaflet-control-layers").style.maxHeight = (document.getElementById("map").offsetHeight - 50) + "px";
}

function clearHighlight() {
  highlight.clearLayers();
}

/* Basemap Layers */
var osm = L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

/* CartoDB */
var cartodb = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap-Mitwirkende & CARTO'
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

/**************************************************************************************************/
// ROUTE LAYER
/**************************************************************************************************/

var routes = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
       click: function (e) {
         document.getElementById("feature-title").innerHTML = "Entfernung";
         document.getElementById("feature-info").innerHTML = "Entfernung zur nächsten Sehenwürdigkeit: "
            + feature.properties.distance
            + "<br/> Voraussichtliche Dauer ohne Pause: "
            + feature.properties.time;
         bootstrap.Modal.getOrCreateInstance(document.getElementById("featureModal")).show();
       }
    });
  }
});

/**************************************************************************************************/
// GET ROUTE
/**************************************************************************************************/

urlroute = "service/route/" + namespace +  ".geojson"

fetch(urlroute, {
  method: 'HEAD' // Verwende die HEAD-Methode, um nur den Header abzurufen
}).then(response => {
    if (response.ok) {
      fetch(urlroute).then(r => r.json()).then(function(data) {
        routes.addData(data);
        // Erst jetzt ist die Geometrie da → fitBounds + Modal
        if (routes.getBounds().isValid()) {
          map.fitBounds(routes.getBounds());
          sizeLayerControl();
          bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).show();
        }
      }).catch(error => console.error('Fehler beim Laden der Route:', error));
    } else {
      console.log('Die Seite wurde nicht gefunden.');
      urlroute = "service/route/" + config.start.id +  ".geojson";
      fetch(urlroute).then(r => r.json()).then(function(data) {
        routes.addData(data);
        // Erst jetzt ist die Geometrie da → fitBounds + Modal
        if (routes.getBounds().isValid()) {
          map.fitBounds(routes.getBounds());
          sizeLayerControl();
          bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).show();
        }
      }).catch(error => console.error('Fehler beim Laden der Route:', error));
    }
  }).catch(error => {
    console.error('Ein Fehler ist aufgetreten:', error);
  });


/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/**************************************************************************************************/
// POI LAYER
/**************************************************************************************************/

/* Empty layer placeholder to add to layer control for listening when to add/remove pois to markerClusters layer */
var poiLayer = L.geoJson(null);

var pois = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
      // If style is 0, show empty string, else show nr
  //    const iconHtml = (feature.properties.point === "o") ? "" : feature.properties.nr;
  //    const iconSize = (feature.properties.point === "o") ? [20, 20] : [40, 30];
      const iconHtml = "";
      const iconSize = [20, 20];
      return L.marker(latlng, {
        icon: L.divIcon({
          className: 'red-tooltip',
          html: '<div class="icon-container">' + iconHtml + '</div>',
          iconSize: iconSize,
          iconAnchor: [20, 10]
        }),
        title: feature.properties.nr,
        riseOnHover: true
      });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {

      var content = "";
      var url = 'locales/' + namespace + '/' + languageCode + '/p' + feature.properties.id + '.md';

     fetch(url).then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         return response.text(); // Die Antwort als Text abrufen
     }).then(mdFragment => {
        content = marked.parse(mdFragment);
     }).catch(error => {
         console.error('Beim Abrufen des MD-Fragments ist ein Fehler aufgetreten:', error);
     });

      layer.on({
        click: function (e) {
          const featureTitle = feature.properties.name;
          document.getElementById("feature-title").innerHTML = featureTitle;
          document.getElementById("feature-info").innerHTML = content;
          bootstrap.Modal.getOrCreateInstance(document.getElementById("featureModal")).show();
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      var tooltipOptions = {
            offset: [15, 0], // Offset des Tooltips
            direction: 'auto', // Kein Pfeil, Tooltip wird zentriert auf dem Marker.
            opacity: 0.7, // Opazität des Tooltips
            interactive: false // Tooltip soll nicht interaktiv sein
      };

      // bind tooltip Options to layer
      layer.bindTooltip('<div>'
        + layer.feature.properties.name
        + '</div>',
        tooltipOptions);

      // Tooltip automatisch einblenden, wenn stark reingezoomt wird
      map.on('zoomend', function() {
        if (map.getZoom() >= 18) {
          layer.openTooltip();
        } else {
          layer.closeTooltip();
        }
      });

    }
  }
});

/**************************************************************************************************/
// GET POIs
/**************************************************************************************************/

function loadPoiLayer() {

    urlpoi = "service/poi/" + namespace +  ".geojson"

    // Schicht entfernen, falls bereits vorhanden
    if (poiLayer) {
        // remove layer from map
        this.map.removeLayer(poiLayer);
        // remove layer from markercluster
        pois.clearLayers();
    }

    fetch(urlpoi, {
      method: 'HEAD' // Verwende die HEAD-Methode, um nur den Header abzurufen
    }).then(response => {
        if (response.ok) {
          fetch(urlpoi).then(r => r.json()).then(function(data) {
              pois.addData(data);
              map.addLayer(poiLayer);
          }).catch(error => console.error('Fehler beim Laden der POIs:', error));
        } else {
          console.log('Die Seite wurde nicht gefunden.');
          urlpoi = "service/poi/" + config.start.id +  ".geojson";
          fetch(urlpoi).then(r => r.json()).then(function(data) {
              pois.addData(data);
              map.addLayer(poiLayer);
          }).catch(error => console.error('Fehler beim Laden der POIs:', error));
        }
      }).catch(error => {
        console.error('Ein Fehler ist aufgetreten:', error);
      });
}

map = L.map("map", {
  zoom: 14,
  center: [50.944511,6.849597],
  layers: [cartodb, routes, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === poiLayer) {
    markerClusters.addLayer(pois);
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === poiLayer) {
    markerClusters.removeLayer(pois);
  }
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  Object.values(map._layers).forEach(function(layer) {
    if (layer.getAttribution) {
      const el = document.getElementById("attribution");
      if (el) el.innerHTML = layer.getAttribution();
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);


/**************************************************************************************************/
// attributionControl
/**************************************************************************************************/
loadAttributionControl();

function loadAttributionControl() {

    var attributionControl = L.control({
      position: "bottomright"
    });
    attributionControl.onAdd = function (map) {
      var div = L.DomUtil.create("div", "leaflet-control-attribution");

      var url = 'locales/' + namespace + '/' + browserLanguage + '/leaflet-control-attribution.html';
      fetch(url).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Die Antwort als Text abrufen
      }).then(htmlFragment => {
        // Das HTML-Fragment in den DOM einfügen
        div.innerHTML = htmlFragment;
      }).catch(error => {
        console.error('Beim Abrufen des HTML-Fragments ist ein Fehler aufgetreten:', error);
      });

      return div;
    };

    map.addControl(attributionControl);
}

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);


/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  showCompass: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 5,
    clickable: false
  },
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/**************************************************************************************************/
// HELP CONTROL
/**************************************************************************************************/

var HelpControl = L.Control.extend({
  options: {
    position: 'bottomright'
  },
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    var button = L.DomUtil.create('a', 'leaflet-control-hilfe-btn', container);
    button.innerHTML = '?';
    button.href = '#';
    button.title = 'Hilfe';
    L.DomEvent.on(button, 'click', function(e) {
      L.DomEvent.stopPropagation(e);
      e.preventDefault();
      bootstrap.Modal.getOrCreateInstance(document.getElementById('hilfeModalDiv')).show();
    });
    return container;
  }
});

new HelpControl().addTo(map);

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "CartoDB": cartodb,
  "OSM": osm
};

var groupedOverlays = {
  "POI": {
    "Points Of Interest": poiLayer
  },
  "Route": {
    "Route": routes
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);


// Leaflet patch to make layer control scrollable on touch browsers
var container = document.querySelector(".leaflet-control-layers");
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}

/**************************************************************************************************/
// DOWNLOAD MENU
/**************************************************************************************************/

/*
This class constructs an url out of urlparameter and returns url, id, path, type
*/
class URLParameter {

    constructor() {
        this.id = namespace;
    }

    getId() {
        return this.id;
    }

    getUrl() {
        return "service/" + this.path + "/" + this.id + "." + this.type;
    }

    getPath() {
        return this.path;
    }

    getType() {
        return this.type;
    }

}

/**
This class extends URLParameter and defines path and type. Use like this:
new URLParameterGPX().getUrl();
*/
class URLParameterGPX extends URLParameter {

    path = "gpx";
    type = "gpx";
}

class URLParameterPoi extends URLParameter {

    path = "poi";
    type = "geojson";
}


/**
* Klasse, um html fragmente in Abhaengigkeit von der Sprache in den DOM-Tree einzufuegen.
* Benutzung: new ModalBuilder('aboutModal').build(i18next.language);
*/
class ModalBuilder {

     build(elementByid, languageCode) {

         //console.log(elementByid + ":" + languageCode);

         const url = 'locales/' + namespace + '/' + languageCode + '/' + elementByid + '.html';
         fetch(url).then(response => {
             if (!response.ok) {
               throw new Error('Network response was not ok');
             }
             return response.text(); // Die Antwort als Text abrufen
         }).then(htmlFragment => {
             // Das HTML-Fragment in den DOM einfügen
             const element = document.getElementById(elementByid);
             // in case of 'leaflet-*' element can be null
             if (element) {
                 element.innerHTML = htmlFragment;
             }
         }).catch(error => {
             console.error('Beim Abrufen des HTML-Fragments ist ein Fehler aufgetreten:', error);
         });
     }

     loadMarkdown(elementByid, languageCode, fileName) {

            // Markdown-Datei abrufen; fileName ist optional und überschreibt elementByid als Dateiname
            const resolvedFileName = fileName || elementByid;
            const url = 'locales/' + namespace + '/' + languageCode + '/' + resolvedFileName + '.md';
             fetch(url).then(response => {
                 if (!response.ok) {
                   throw new Error('Network response was not ok');
                 }
                 return response.text(); // Die Antwort als Text abrufen
             }).then(mdFragment => {
            const htmlFragment = marked.parse(mdFragment);
            const element = document.getElementById(elementByid);
            if (element) {
                element.innerHTML = htmlFragment;
            }
         }).catch(error => {
             console.error('Beim Abrufen des HTML-Fragments ist ein Fehler aufgetreten:', error);
         });
    }

}

/**************************************************************************************************/
// FOOTER LINK HANDLERS
/**************************************************************************************************/

document.getElementById("footer-impressum-btn").addEventListener("click", function(e) {
  e.preventDefault();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("fImpressumModal")).show();
});

document.getElementById("footer-disclaimer-btn").addEventListener("click", function(e) {
  e.preventDefault();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("fDisclaimerModal")).show();
});

document.getElementById("footer-datenschutz-btn").addEventListener("click", function(e) {
  e.preventDefault();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("fDatenschutzModal")).show();
});

document.getElementById("nav-coffee-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("fCoffeeModal")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});