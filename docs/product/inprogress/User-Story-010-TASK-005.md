# User-Story-010-TASK-005: Bootstrap-jQuery-API in app.js auf Bootstrap-5-JS-API umstellen

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
In `app.js` werden alle Bootstrap-spezifischen jQuery-API-Aufrufe (`.modal("show")`, `.collapse("hide")`,
`.collapse("toggle")`) durch die native Bootstrap-5-JavaScript-API ersetzt.
Nicht-Bootstrap-jQuery-Aufrufe (DOM-Events, `animate()`, DataTables) werden auf native Browser-APIs
umgestellt, um die jQuery-Abhängigkeit vollständig zu eliminieren.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Bootstrap 5 bietet eine eigene JS-API ohne jQuery:
  - Modal öffnen: `bootstrap.Modal.getOrCreateInstance(el).show()`
  - Collapse toggling: `bootstrap.Collapse.getOrCreateInstance(el).toggle()` / `.hide()`
- BS5 nutzt `.show` statt `.in` als aktive Collapse-Klasse → `.navbar-collapse.in` wird zu `.navbar-collapse.show`
- jQuery-Aufrufe im Überblick (alle in `app.js`):

  | Zeile | jQuery-Aufruf | Bootstrap-5-Ersatz |
  |---|---|---|
  | 11 | `$(window).resize(fn)` | `window.addEventListener('resize', fn)` |
  | 15 | `$(document).on("click", ".feature-row", fn)` | `document.addEventListener('click', fn)` mit `e.target.closest('.feature-row')` |
  | 16 | `$(document).off("mouseout", ...)` | `document.removeEventListener(...)` (mit gespeicherter Referenz) |
  | 17 | `$(this).attr("id")` | `e.target.closest('.feature-row').getAttribute('id')` |
  | 21 | `$(document).on("mouseover", ".feature-row", fn)` | `document.addEventListener('mouseover', fn)` |
  | 22 | `$(this).attr("lat")` / `.attr("lng")` | `.getAttribute('lat')` / `.getAttribute('lng')` |
  | 26 | `$(document).on("mouseout", ...)` | `document.addEventListener('mouseout', fn)` |
  | 28 | `$("#about-btn").click(fn)` | `document.getElementById('about-btn').addEventListener('click', fn)` |
  | 29 | `$("#aboutModalDiv").modal("show")` | `bootstrap.Modal.getOrCreateInstance(document.getElementById('aboutModalDiv')).show()` |
  | 30 | `$(".navbar-collapse.in").collapse("hide")` | `bootstrap.Collapse.getOrCreateInstance(document.querySelector('.navbar-collapse')).hide()` |
  | 34 | `$("#full-extent-btn").click(fn)` | `addEventListener('click', fn)` |
  | 35 | `$("#startModal").modal("show")` | `bootstrap.Modal.getOrCreateInstance(...)` |
  | 37 | analog collapse hide | analog |
  | 51–68 | `$(document).ready(fn)` + DataTable | `document.addEventListener('DOMContentLoaded', fn)` |
  | 72 | `$("#legendModal").modal("show")` | `bootstrap.Modal.getOrCreateInstance(...)` |
  | 78 | `$(".navbar-collapse.in").collapse("hide")` | analog |
  | 88 | `$(".navbar-collapse").collapse("toggle")` | `bootstrap.Collapse.getOrCreateInstance(...)` |
  | 114–117 | `$("#sidebar").animate(...)` | CSS-Transition oder `element.style` + `transitionend`-Event |
  | 118 | `$(".leaflet-control-layers").css(...)` | `element.style.maxHeight = ...` |
  | 124 | `$("#sidebar").hide()` | `document.getElementById('sidebar').style.display = 'none'` |
  | 661–678 | Footer-Modal-Buttons (.click + .modal("show")) | `addEventListener` + `bootstrap.Modal` |
  | syncSidebar | `$("#feature-list tbody").empty()` / `.append(...)` | `tbody.innerHTML = ''` / `innerHTML +=` |

## Schritte
- [ ] Alle `$("#id").modal("show")`-Aufrufe durch `bootstrap.Modal.getOrCreateInstance(document.getElementById('id')).show()` ersetzen
  (Modals: aboutModalDiv, startModal, legendModal, featureModal, fImpressumModal, fDisclaimerModal, fDatenschutzModal, fCoffeeModal)
- [ ] `.navbar-collapse.in` durch `.navbar-collapse.show` ersetzen (Zustandsklasse in BS5 heißt `.show`)
- [ ] `$(".navbar-collapse.in").collapse("hide")` → `bootstrap.Collapse.getOrCreateInstance(document.querySelector('.navbar-collapse')).hide()`
- [ ] `$(".navbar-collapse").collapse("toggle")` → `.toggle()`
- [ ] `#nav-btn`-Handler entfernen (nach Umstellung der Navbar in TASK-004 wird der BS5-Toggler nativ bedient)
- [ ] Event-Handler (click, mouseover, mouseout, resize) auf native `addEventListener`-Aufrufe umstellen
- [ ] `$("#feature-list tbody").empty()` → `document.querySelector('#feature-list tbody').innerHTML = ''`
- [ ] `$("#feature-list tbody").append(...)` → `element.insertAdjacentHTML('beforeend', ...)`
- [ ] `$("#sidebar").animate(...)` → CSS-Klasse mit `transition: width 350ms` Toggle (bevorzugt) oder `requestAnimationFrame`-Lösung
- [ ] `$("#sidebar").hide()` → `document.getElementById('sidebar').classList.add('d-none')` oder `style.display = 'none'`
- [ ] `$(".leaflet-control-layers").css("max-height", ...)` → direktes `style`-Property setzen
- [ ] jQuery-`<script>`-Tag in `index.html` nach erfolgreicher Entfernung aller jQuery-Abhängigkeiten entfernen
- [ ] Browser-Console auf JavaScript-Fehler prüfen
- [ ] Alle Modals, Navbar, Sidebar und Tabelle funktionstesten

## Ergebnis
`app.js` enthält keine jQuery-Abhängigkeit mehr; alle Bootstrap-Interaktionen nutzen die Bootstrap-5-JS-API;
der jQuery-`<script>`-Tag in `index.html` ist entfernt.

## Status
Todo

## Aufwand
L
