# User-Story-011-TASK-005: `assets/js/app.js` – `animateSidebar()`, `sidebarClick()`, `syncSidebar()` und deren Aufrufe entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Die drei Sidebar-Funktionen `animateSidebar()`, `sidebarClick()` und `syncSidebar()` sowie alle zugehörigen Event-Listener und Aufrufe aus `app.js` entfernen.

## Technische Details
- Betroffene Datei: `assets/js/app.js`

## Zu entfernende Code-Stellen

**Event-Listener für `list-btn`:**
```js
document.getElementById("list-btn").addEventListener("click", function() {
  animateSidebar();
  return false;
});
```

**Event-Listener für `sidebar-toggle-btn`:**
```js
document.getElementById("sidebar-toggle-btn") && document.getElementById("sidebar-toggle-btn").addEventListener("click", function() {
  animateSidebar();
  return false;
});
```

**Event-Listener für `sidebar-hide-btn`:**
```js
document.getElementById("sidebar-hide-btn").addEventListener("click", function() {
  animateSidebar();
  return false;
});
```

**Funktion `animateSidebar()`:**
```js
function animateSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("sidebar-hidden");
  sidebar.addEventListener("transitionend", function handler() {
    map.invalidateSize();
    sidebar.removeEventListener("transitionend", handler);
  });
}
```

**Funktion `sidebarClick(id)`:**
```js
function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 20);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    document.getElementById("sidebar").style.display = "none";
    map.invalidateSize();
  }
}
```

**Funktion `syncSidebar()`:**
```js
function syncSidebar() {
  /* Empty sidebar features */
  document.querySelector("#feature-list tbody").innerHTML = "";
  /* Loop through pois layer … */
  pois.eachLayer(function (layer) {
    if (map.hasLayer(poiLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        const propsnr = (layer.feature.properties.point === "p") ? layer.feature.properties.nr : " "
        document.querySelector("#feature-list tbody").insertAdjacentHTML("beforeend", …);
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", { valueNames: ["feature-name"] });
  featureList.sort("feature-nr", { order: "asc" });
}
```

**`syncSidebar()`-Aufrufe in Map-Events entfernen:**

In `map.on("overlayadd")` – nur `syncSidebar()` entfernen, `markerClusters.addLayer(pois)` bleibt:
```js
map.on("overlayadd", function(e) {
  if (e.layer === poiLayer) {
    markerClusters.addLayer(pois);
    syncSidebar();  // ← entfernen
  }
});
```

In `map.on("overlayremove")` – nur `syncSidebar()` entfernen, `markerClusters.removeLayer(pois)` bleibt:
```js
map.on("overlayremove", function(e) {
  if (e.layer === poiLayer) {
    markerClusters.removeLayer(pois);
    syncSidebar();  // ← entfernen
  }
});
```

**`map.on("moveend")`-Listener vollständig entfernen:**
```js
/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});
```

## Schritte
- [ ] Event-Listener für `list-btn` entfernen
- [ ] Event-Listener für `sidebar-toggle-btn` entfernen
- [ ] Event-Listener für `sidebar-hide-btn` entfernen
- [ ] Funktion `animateSidebar()` entfernen
- [ ] Funktion `sidebarClick()` entfernen
- [ ] Funktion `syncSidebar()` entfernen
- [ ] `syncSidebar()`-Aufruf in `map.on("overlayadd")` entfernen
- [ ] `syncSidebar()`-Aufruf in `map.on("overlayremove")` entfernen
- [ ] `map.on("moveend", …)`-Listener vollständig entfernen
- [ ] Prüfen: Keine Referenz auf `syncSidebar`, `sidebarClick`, `animateSidebar` mehr vorhanden

## Ergebnis
Alle drei Sidebar-Funktionen und ihre Aufrufe sind aus `app.js` entfernt.

## Status
Offen

## Aufwand
M
