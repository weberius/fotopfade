var map;
let urlroute, urlpoi;
let startModalUserTriggered = false;

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
  startModalUserTriggered = true;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).show();
  map.fitBounds(routes.getBounds());
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("startModal").addEventListener("show.bs.modal", function() {
  var tourBtn = document.getElementById("start-tour-btn");
  var label = document.getElementById("startTourBtnLabel");
  if (startModalUserTriggered) {
    tourBtn.classList.remove("btn-primary");
    tourBtn.classList.add("btn-secondary");
    tourBtn.setAttribute("data-bs-dismiss", "modal");
    label.textContent = i18next.t("closeBtn");
  } else {
    tourBtn.classList.remove("btn-secondary");
    tourBtn.classList.add("btn-primary");
    tourBtn.removeAttribute("data-bs-dismiss");
    label.textContent = i18next.t("tourStarten");
  }
});

document.getElementById("start-tour-btn").addEventListener("click", function() {
  if (!startModalUserTriggered && routes.getBounds().isValid()) {
    map.fitBounds(routes.getBounds());
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).hide();
});

// Audio beim Schliessen des POI-Modals stoppen und Icon zurücksetzen
document.getElementById("featureModal").addEventListener("hidden.bs.modal", function() {
  var audio = document.getElementById("feature-audio");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("feature-play-btn").classList.remove("is-playing");
});

// Audio beim Schliessen des Start-Modals stoppen
document.getElementById("startModal").addEventListener("hidden.bs.modal", function() {
  var audio = document.getElementById("start-audio");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("start-play-btn").classList.remove("is-playing");
  startModalUserTriggered = false;
});

// Audio beim Schliessen des Geschichte-Modals stoppen
document.getElementById("geschichteModalDiv").addEventListener("hidden.bs.modal", function() {
  var audio = document.getElementById("geschichte-audio");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("geschichte-play-btn").classList.remove("is-playing");
});

// Play/Pause-Toggle für den POI-Audio-Button.
// Das Icon (Play-Dreieck vs. Pause-Balken) wird ausschließlich über
// die CSS-Klasse .is-playing gesteuert (→ app.css).
document.getElementById("feature-play-btn").addEventListener("click", function() {
  var audio = document.getElementById("feature-audio");
  var btn   = document.getElementById("feature-play-btn");
  if (audio.paused) {
    audio.play();
    btn.classList.add("is-playing");
  } else {
    audio.pause();
    btn.classList.remove("is-playing");
  }
});

// Play/Pause-Toggle für den Start-Audio-Button
document.getElementById("start-play-btn").addEventListener("click", function() {
  var audio = document.getElementById("start-audio");
  var btn   = document.getElementById("start-play-btn");
  if (audio.paused) {
    audio.play();
    btn.classList.add("is-playing");
  } else {
    audio.pause();
    btn.classList.remove("is-playing");
  }
});

// Play/Pause-Toggle für den Geschichte-Audio-Button
document.getElementById("geschichte-play-btn").addEventListener("click", function() {
  var audio = document.getElementById("geschichte-audio");
  var btn   = document.getElementById("geschichte-play-btn");
  if (audio.paused) {
    audio.play();
    btn.classList.add("is-playing");
  } else {
    audio.pause();
    btn.classList.remove("is-playing");
  }
});

// Icon zurücksetzen, wenn Audio natürlich endet
document.getElementById("feature-audio").addEventListener("ended", function() {
  document.getElementById("feature-play-btn").classList.remove("is-playing");
});
document.getElementById("start-audio").addEventListener("ended", function() {
  document.getElementById("start-play-btn").classList.remove("is-playing");
});
document.getElementById("geschichte-audio").addEventListener("ended", function() {
  document.getElementById("geschichte-play-btn").classList.remove("is-playing");
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


/**************************************************************************************************/
// POI MARKDOWN PARSER
/**************************************************************************************************/

/**
 * Zerlegt das Markdown einer POI-Datei in Bild-URL, Teaser-Text und KI-Hinweis.
 * Das Markdown soll formatierungsarm sein (kein HTML, keine Inline-Styles).
 *
 * Erwartet werden:
 *   - Erste Zeile: ![alt](./images/pfad/pN.jpg)
 *   - Fließtext-Absätze (werden auf targetWords gekürzt)
 *   - Letzter kursiver Absatz: _Die Inhalte..._  (KI-Hinweis)
 *   - Weitere Abschnitte (## Quellen) werden ignoriert
 *
 * @param {string} md          - Markdown-Inhalt der POI-Datei
 * @param {number} targetWords - Ziel-Wortanzahl für den Teaser (Standard: 70)
 * @returns {{ imageSrc: string, teaser: string, kiHint: string }}
 */
function parsePoiMarkdown(md, targetWords) {
  targetWords = targetWords || 100;

  // 1. Bild-URL aus erstem ![alt](src)
  // Pfade der Form ./images/... werden zu images/... normalisiert.
  // Pfade ohne ./-Präfix bleiben unverändert — beides ist korrekt.
  var imageMatch = md.match(/!\[.*?\]\((.*?)\)/);
  var imageSrc = imageMatch ? imageMatch[1].replace(/^\.\//,  '') : '';

  // 2. KI-Hinweis: letzter mit _ ... _ markierter Absatz
  var kiMatch = md.match(/_([^_]+)_\s*$/);
  var kiHint = kiMatch ? kiMatch[1].trim() : '';

  // 3. Teaser: Alle nicht-Fließtext-Elemente entfernen
  var cleaned = md
    .replace(/!\[.*?\]\(.*?\)/g, '')           // Bilder entfernen
    .replace(/^#+\s.*$/gm, '')                  // Überschriften entfernen
    .replace(/<[^>]+>[\s\S]*?<\/[^>]+>/gm, '') // HTML-Blöcke entfernen
    .replace(/<[^>]+>/g, '')                    // einzelne HTML-Tags entfernen
    .replace(/^_.*_$/gm, '')                    // kursive Zeilen (KI-Hinweis) entfernen
    .replace(/^[-*]\s.*$/gm, '')               // Listeneinträge entfernen
    .replace(/\r?\n/g, ' ')                    // Zeilenumbrüche in Leerzeichen
    .replace(/\s{2,}/g, ' ')                   // Mehrfach-Leerzeichen normalisieren
    .trim();

  // 4. Auf Ziel-Wortanzahl kürzen
  var words = cleaned.split(' ').filter(function(w) { return w.length > 0; });
  var teaser = words.slice(0, targetWords).join(' ');
  if (words.length > targetWords) {
    teaser += ' \u2026'; // …
  }

  return { imageSrc: imageSrc, teaser: teaser, kiHint: kiHint };
}

/**
 * Lädt eine Markdown-Datei, parst sie mit parsePoiMarkdown() und befüllt
 * die DOM-Elemente eines POI-artig gestalteten Modals.
 * Wird von updateContent() in locale.js aufgerufen.
 * @param {string} idPrefix  - Präfix der DOM-IDs (z.B. 'start', 'geschichte')
 * @param {string} fileName  - Dateiname ohne .md (z.B. 'startModalBody')
 * @param {string} audioFile - Audio-Dateiname (z.B. 'start.mp3')
 */
function loadPoiStyleModal(idPrefix, fileName, audioFile) {
  var mdUrl    = 'locales/' + namespace + '/' + languageCode + '/' + fileName + '.md';
  var audioUrl = 'locales/' + namespace + '/' + languageCode + '/' + audioFile;
  fetch(mdUrl)
    .then(function(response) {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(function(mdText) {
      var parsed = parsePoiMarkdown(mdText);
      document.getElementById(idPrefix + '-image').src           = parsed.imageSrc;
      document.getElementById(idPrefix + '-image').alt           = '';
      document.getElementById(idPrefix + '-text').textContent    = parsed.teaser;
      document.getElementById(idPrefix + '-ki-hint').textContent = parsed.kiHint;
      var audio = document.getElementById(idPrefix + '-audio');
      audio.src = audioUrl;
      audio.load();
      document.getElementById(idPrefix + '-play-btn').classList.remove('is-playing');
    })
    .catch(function(error) {
      console.error('Fehler beim Laden von ' + mdUrl + ':', error);
    });
}

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

      var poiMd = "";
      var mdUrl = 'locales/' + namespace + '/' + languageCode + '/p' + feature.properties.id + '.md';

      fetch(mdUrl).then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      }).then(function(mdFragment) {
        poiMd = mdFragment;
      }).catch(function(error) {
        console.error('Beim Abrufen des MD-Fragments ist ein Fehler aufgetreten:', error);
      });

      layer.on({
        click: function (e) {
          // Bekannte Einschränkung: Falls der fetch() noch nicht abgeschlossen ist
          // (z.B. bei sehr langsamem Netz und sofortigem Klick), ist poiMd leer.
          // Das Modal wird dann mit leeren Feldern angezeigt. Dieses Race-Condition-
          // Verhalten entspricht dem bisherigen Stand und wird in dieser Story
          // nicht gelöst.
          var parsed   = parsePoiMarkdown(poiMd);
          var audioUrl = 'locales/' + namespace + '/' + languageCode + '/p' + feature.properties.id + '.mp3';

          document.getElementById("feature-title").textContent   = feature.properties.name;
          document.getElementById("feature-image").src           = parsed.imageSrc;
          document.getElementById("feature-image").alt           = feature.properties.name;
          document.getElementById("feature-text").textContent    = parsed.teaser;
          document.getElementById("feature-ki-hint").textContent = parsed.kiHint;

          var audio = document.getElementById("feature-audio");
          audio.src = audioUrl;
          audio.load();
          document.getElementById("feature-play-btn").classList.remove("is-playing");

          bootstrap.Modal.getOrCreateInstance(document.getElementById("featureModal")).show();
          highlight.clearLayers().addLayer(
            L.circleMarker(
              [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
              highlightStyle
            )
          );
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