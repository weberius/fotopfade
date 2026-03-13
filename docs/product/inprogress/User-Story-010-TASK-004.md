# User-Story-010-TASK-004: Navbar auf Bootstrap-5-Struktur umbauen

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Die Navbar in `index.html` wird vollständig auf Bootstrap-5-Strukturen umgestellt. Das umfasst
HTML-Element, Klassen, data-Attribute auf Navbar-Elementen sowie den Hamburger-Toggler.
Alle Navbar-spezifischen Änderungen werden in diesem Task zusammengefasst.

## Technische Details
- Betroffene Datei: `index.html`, ausschließlich das `<div class="navbar ...">` und seine Kinder.
- Änderungsübersicht:

  | Bereich | Bootstrap 3 | Bootstrap 5 |
  |---|---|---|
  | Navbar-Element | `<div class="navbar navbar-inverse navbar-fixed-top">` | `<nav class="navbar navbar-dark bg-dark fixed-top">` |
  | Wrapper | `<div class="navbar-header">` | entfällt; Kinder direkt in `.container-fluid` |
  | Hamburger | `<a id="nav-btn" class="navbar-icon pull-right visible-xs">` (jQuery-gesteuert) | `<button class="navbar-toggler">` (BS5-nativ) |
  | Collapse-Div | `<div class="navbar-collapse collapse">` | `<div class="collapse navbar-collapse" id="navbarMenu">` |
  | Nav-Link-Attribute | `data-toggle="collapse" data-target=".navbar-collapse.in"` | `data-bs-toggle="collapse" data-bs-target="#navbarMenu"` |
  | Dropdown-Attribut | `data-toggle="dropdown"` | `data-bs-toggle="dropdown"` |
  | Caret | `<b class="caret">` | entfällt (CSS-generiert) |

- Der alte Hamburger `#nav-btn` entfällt; sein jQuery-Handler in `app.js` wird in TASK-005 entfernt.
- Die Nav-Links behalten trotz BS5-Toggler ihre `data-bs-toggle/target`-Attribute, damit das Menü beim
  Klick auf einen Eintrag auf kleinen Bildschirmen automatisch geschlossen wird (gleiche UX wie bisher).

## Schritte
- [ ] Äußeres `<div class="navbar navbar-inverse navbar-fixed-top">` zu `<nav class="navbar navbar-dark bg-dark fixed-top">` ändern (schließendes `</div>` zu `</nav>` anpassen)
- [ ] `<div class="navbar-header">` entfernen und seinen Inhalt direkt in `.container-fluid` belassen
- [ ] Den alten `#nav-btn`-Link entfernen und durch BS5-Toggler ersetzen:
  ```html
  <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarMenu"
          aria-controls="navbarMenu" aria-expanded="false"
          aria-label="Navigation öffnen">
    <span class="navbar-toggler-icon"></span>
  </button>
  ```
- [ ] `<div class="navbar-collapse collapse">` → `<div class="collapse navbar-collapse" id="navbarMenu">`
- [ ] Alle Nav-Link-Attribute auf Navbar-Links ersetzen:
  `data-toggle="collapse" data-target=".navbar-collapse.in"` → `data-bs-toggle="collapse" data-bs-target="#navbarMenu"`
- [ ] Dropdown-Link: `data-toggle="dropdown"` → `data-bs-toggle="dropdown"`
- [ ] `<b class="caret"></b>` entfernen
- [ ] Responsives Verhalten testen: Hamburger-Menü auf schmalen Bildschirmen ein-/ausklappen;
  Menü schließt beim Klick auf einen Nav-Eintrag

## Ergebnis
Die Navbar verwendet ausschließlich Bootstrap-5-Klassen und -Attribute; der Hamburger-Toggler
funktioniert ohne eigene JavaScript-Logik; das bisherige visuelle Erscheinungsbild bleibt erhalten.

## Status
Todo

## Aufwand
M
