# User-Story-010-TASK-006: jQuery-Abhängigkeit aus app.js entfernen

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Nach TASK-005 enthält `app.js` keine Bootstrap-Plugin-jQuery-Aufrufe mehr, aber noch zahlreiche
weitere jQuery-Nutzungen: Event-Handler, DOM-Manipulation, AJAX-Aufrufe und Animationen.
Dieser Task ersetzt alle verbleibenden `$(...)`-Konstrukte durch native Browser-APIs und entfernt
anschließend den jQuery-`<script>`-Tag aus `index.html`.

## Technische Details
- Betroffene Dateien: `assets/js/app.js`, `index.html`
- Überblick aller verbleibenden jQuery-Verwendungen nach TASK-005:

  | Stelle | jQuery | Vanilla JS |
  |---|---|---|
  | `$(window).resize(fn)` | jQuery event | `window.addEventListener('resize', fn)` |
  | `$(document).on("click", ".feature-row", fn)` | delegiertes Event | `document.addEventListener('click', e => { const r = e.target.closest('.feature-row'); if (r) fn.call(r, e); })` |
  | `$(document).off("mouseout", ".feature-row", fn)` | Event-Entfernung | `document.removeEventListener('mouseout', fn)` (benötigt gespeicherte Referenz) |
  | `$(this).attr("id")` / `.attr("lat")` / `.attr("lng")` | Attribut-Lesen | `.getAttribute('id')` / `.getAttribute('lat')` / `.getAttribute('lng')` |
  | `$(document).on("mouseover/mouseout", ".feature-row", fn)` | delegierte Events | analog click |
  | `$("#btn-id").click(fn)` (about, full-extent, legend, list, sidebar) | Event-Bindung | `document.getElementById('btn-id').addEventListener('click', fn)` |
  | `$(document).ready(fn)` in legend-btn Handler | DOM-Ready | `DOMContentLoaded` oder direkt, da Script am Ende des Body |
  | `$("#sidebar").animate({width:"toggle"}, 350, fn)` | jQuery-Animation | CSS-Transition auf `#sidebar`: `transition: width 350ms` + Klasse toggle |
  | `$(".leaflet-control-layers").css("max-height", …)` | Stil setzen | `document.querySelector('.leaflet-control-layers').style.maxHeight = …` |
  | `$("#sidebar").hide()` | Sichtbarkeit | `document.getElementById('sidebar').style.display = 'none'` |
  | `$("#feature-list tbody").empty()` | DOM leeren | `querySelector('#feature-list tbody').innerHTML = ''` |
  | `$("#feature-list tbody").append(html)` | DOM einfügen | `querySelector('#feature-list tbody').insertAdjacentHTML('beforeend', html)` |
  | `$("#feature-title").html(text)` / `$("#feature-info").html(…)` | Inhalt setzen | `getElementById('feature-title').innerHTML = text` |
  | `$.getJSON(url, fn)` (2 Stellen: Route, POI) | jQuery-AJAX | `fetch(url).then(r=>r.json()).then(fn)` |
  | `$.each(map._layers, fn)` | Iteration | `Object.values(map._layers).forEach(fn)` |
  | `$(document).one("ajaxStop", fn)` | jQuery-AJAX-Event | entfällt nach Migration zu `fetch`; Inhalt (`sizeLayerControl`, `fitBounds`) direkt in `fetch`-Callbacks aufrufen |
  | `$(".leaflet-control-layers")[0]` | Element-Zugriff | `document.querySelector('.leaflet-control-layers')` |
  | `$("#featureModal").on("hidden.bs.modal", fn)` | BS5-Custom-Event | `document.getElementById('featureModal').addEventListener('hidden.bs.modal', fn)` |

- Hinweis DataTables: `$('#culturalpath').DataTable(…)` setzt jQuery voraus. DataTables 2.x unterstützt
  auch eine jQuery-freie Initialisierung via `new DataTable('#culturalpath', options)`. Die Umstellung
  ist Teil dieses Tasks; jQuery kann erst danach aus `index.html` entfernt werden.
- Hinweis `ajaxStop`: Das Event feuert nur bei `$.getJSON`-Aufrufen. Nach der Umstellung auf `fetch`
  entfällt es. `sizeLayerControl()` und `map.fitBounds()` werden stattdessen in den `fetch`-Callbacks
  der Route- und POI-Ladefunktionen aufgerufen, sobald die Daten verfügbar sind.

## Schritte
- [ ] Event-Handler `$(window).resize`, `$(document).on("click/mouseover/mouseout", …)` auf
  `addEventListener` umstellen; delegierte Events mit `e.target.closest(selector)` nachbilden
- [ ] `$(this).attr(…)`-Zugriffe durch `.getAttribute(…)` auf dem nativen Element ersetzen
- [ ] `$("#btn-id").click(fn)` auf `getElementById/querySelector(…).addEventListener('click', fn)` umstellen
  (about-btn, full-extent-btn, legend-btn, list-btn, sidebar-toggle-btn, sidebar-hide-btn)
- [ ] `$(document).ready(fn)` im legend-btn Handler entfernen; DataTable-Init direkt aufrufen
  (Skript ist am Body-Ende – DOM ist bereits bereit)
- [ ] DataTables auf jQuery-freie API umstellen: `new DataTable('#culturalpath', options)`
- [ ] `$.getJSON(url, fn)` durch `fetch(url).then(r => r.json()).then(fn).catch(…)` ersetzen (Route und POI)
- [ ] `$(document).one("ajaxStop", fn)` entfernen; `sizeLayerControl()` und `map.fitBounds()`
  in die fetch-Callbacks der Route-/POI-Ladefunktionen integrieren
- [ ] `$.each(map._layers, fn)` → `Object.values(map._layers).forEach(fn)` in `updateAttribution`
- [ ] `$(".leaflet-control-layers")[0]` → `document.querySelector('.leaflet-control-layers')`
- [ ] `$("#featureModal").on("hidden.bs.modal", fn)` → `addEventListener('hidden.bs.modal', fn)`
- [ ] `$("#feature-list tbody").empty()` / `.append(html)` → `innerHTML = ''` / `insertAdjacentHTML`
- [ ] `$("#feature-title").html(…)` / `$("#feature-info").html(…)` → `.innerHTML = …`
- [ ] `animateSidebar`: `$("#sidebar").animate({width:"toggle"}, 350, fn)` durch CSS-Transition ersetzen:
  Klasse `sidebar-hidden` zu `#sidebar` toggle; in `app.css` `transition: width 350ms` definieren;
  nach Transition `map.invalidateSize()` über `transitionend`-Event aufrufen
- [ ] `$("#sidebar").hide()` → `document.getElementById('sidebar').style.display = 'none'`
  (oder via Klasse analog `animateSidebar`)
- [ ] `$(".leaflet-control-layers").css("max-height", …)` → direktes `style`-Property setzen
- [ ] jQuery-`<script>`-Tag aus `index.html` entfernen und Seite auf Fehler testen
- [ ] Browser-Console auf verbleibende jQuery-Fehler prüfen

## Ergebnis
`app.js` enthält kein `$()` mehr; jQuery-CDN-Tag ist aus `index.html` entfernt; alle Funktionen
verhalten sich wie zuvor.

## Status
Todo

## Aufwand
L
