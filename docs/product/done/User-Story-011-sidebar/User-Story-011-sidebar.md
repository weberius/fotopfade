# User Story: Sidebar entfernen

## Entfernung der Sehenswürdigkeiten-Sidebar

**Als** Nutzer der Fotopfad-Webapp  
**möchte ich** keine Sidebar mit der POI-Liste mehr sehen,  
**damit** die Kartenansicht den gesamten verfügbaren Platz ausfüllt und die Oberfläche übersichtlicher wird.

**Als** Entwickler der Fotopfad-Webapp  
**möchte ich** die Sidebar vollständig aus Markup, JavaScript und CSS entfernen,  
**damit** der Code schlanker und wartungsfreundlicher wird.

### Hintergrund

Die Webapp zeigt neben der Karte eine aufklappbare Seitenleiste ("Sidebar") an, die alle POIs des aktuellen Pfades als scrollbare Liste darstellt. Über den Menüpunkt "Sehenswürdigkeiten" (bzw. dessen lokalisierte Entsprechungen) im Burger-Menü kann die Sidebar ein- und ausgeblendet werden.

Diese Sidebar wird nicht mehr benötigt. POIs werden über Marker und Tooltips direkt auf der Karte sowie über das Feature-Modal zugänglich gemacht; eine zusätzliche Listenansicht in der Sidebar ist redundant und belegt unnötig Platz.

### Akzeptanzkriterien

* **Menüpunkt entfernt:** Der `<li>`-Eintrag mit `id="list-btn"` ist nicht mehr in der Navbar vorhanden.
* **Sidebar-HTML entfernt:** Das `<div id="sidebar">` mit allen Kindelementen (`.sidebar-wrapper`, `.card#features`, `#feature-list`) existiert nicht mehr in `index.html`.
* **CSS entfernt:** Alle sidebar-spezifischen Regeln (`#sidebar`, `#sidebar.sidebar-hidden`, `#features`, `#sidebar-hide-btn`, `.sidebar-wrapper`, `.sidebar-table` sowie der `@media (max-width: 767px) { #sidebar { display: none; } }`-Block) sind aus `app.css` entfernt.
* **JavaScript entfernt:** Alle sidebar-bezogenen Funktionen und Event-Listener sind aus `app.js` entfernt:
  * `animateSidebar()`
  * `sidebarClick(id)`
  * `syncSidebar()`
  * Event-Listener für `list-btn`, `sidebar-toggle-btn`, `sidebar-hide-btn`
  * Click-Handler für `.feature-row` (inkl. `delegatedMouseout`-Logik)
  * Mouseover-Handler für `.feature-row` (Highlight via Sidebar-Zeile)
  * `document.addEventListener("mouseout", delegatedMouseout)`
  * `map.on("moveend", syncSidebar)`
  * `map.on("overlayadd")` → `syncSidebar()`-Aufruf entfernt
  * `map.on("overlayremove")` → `syncSidebar()`-Aufruf entfernt
  * `featureList`-Variable und deren Befüllung in `syncSidebar()`
  * POI-Eintrag in `#feature-list tbody` aus `pois.onEachFeature`
* **locale.js bereinigt:** Die Zeilen `poisSelectorSpan` und `poisPanelTitle` sind aus `updateContent()` entfernt.
* **Keine JavaScript-Fehler:** Die Browser-Konsole zeigt nach der Änderung keine neuen Fehler.
* **Karte füllt vollen Platz:** Da `#sidebar` wegfällt, nimmt `#map` den gesamten Containerbereich ein.

### Betroffene Dateien

| Datei | Warum betroffen |
|---|---|
| `index.html` | Navbar-`<li>` `list-btn`, gesamtes `<div id="sidebar">` |
| `assets/css/app.css` | `#sidebar`, `#sidebar.sidebar-hidden`, `#features`, `#sidebar-hide-btn`, `.sidebar-wrapper`, `.sidebar-table`, Media-Query-Block |
| `assets/js/app.js` | `featureList`, `delegatedMouseout`, Click-/Mouseover-Handler für `.feature-row`, `animateSidebar()`, `sidebarClick()`, `syncSidebar()`, map-Events `moveend`/`overlayadd`/`overlayremove`, POI-Listeneintrag in `onEachFeature` |
| `assets/js/locale.js` | `poisSelectorSpan` und `poisPanelTitle` in `updateContent()` |

### Aufgaben (Tasks)

- [ ] **TASK-001** `index.html` – Navbar-Listeneintrag `list-btn` entfernen
- [ ] **TASK-002** `index.html` – `<div id="sidebar">` vollständig entfernen
- [ ] **TASK-003** `assets/css/app.css` – Alle sidebar-spezifischen CSS-Regeln entfernen
- [ ] **TASK-004** `assets/js/app.js` – `featureList`, `delegatedMouseout`, Feature-Row-Handler entfernen *(vor TASK-005)*
- [ ] **TASK-005** `assets/js/app.js` – `animateSidebar()`, `sidebarClick()`, `syncSidebar()` und deren Aufrufe entfernen *(nach TASK-004; atomar mit TASK-001/002)*
- [ ] **TASK-006** `assets/js/app.js` – POI-Listeneintrag in `pois.onEachFeature` entfernen
- [ ] **TASK-007** `assets/js/locale.js` – `poisSelectorSpan` und `poisPanelTitle` aus `updateContent()` entfernen
- [ ] **TASK-008** `index.html` – `list.js` CDN-Skript-Tag entfernen *(nach TASK-005)*
- [ ] **TASK-009** `index.html` – `handlebars.js` CDN-Skript-Tag entfernen *(unabhängig)*
- [ ] **TASK-010** Contracts aktualisieren – `sidebar-poi-liste.feature` löschen, Szenario in `poi-marker.feature` entfernen *(nach allen anderen Tasks)*
