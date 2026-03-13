# User-Story-010-TASK-004: Navbar-Struktur auf Bootstrap 5 umbauen

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Die Bootstrap-3-Navbar-Struktur in `index.html` verwendet veraltete Klassen und HTML-Muster (`navbar-inverse`,
`navbar-header`, `navbar-collapse collapse`), die in Bootstrap 5 nicht mehr existieren. Die Navbar wird auf
die Bootstrap-5-Struktur umgestellt.

## Technische Details
- Betroffene Datei: `index.html`
- Bootstrap 3 vs. Bootstrap 5 Navbar-Unterschiede:

  | Bereich | Bootstrap 3 | Bootstrap 5 |
  |---|---|---|
  | Farbe | `.navbar-inverse` | `.navbar-dark bg-dark` |
  | Wrapper | `.navbar-header` | entfällt (direkt in `.container-fluid`) |
  | Collapse | `.navbar-collapse.collapse` | `.navbar-collapse` + Toggler-Button |
  | Toggler | eigener `<a href="#">`-Button | `<button class="navbar-toggler" data-bs-toggle="collapse">` |
  | Dropdown-Caret | `<b class="caret">` | entfällt (CSS-generiert) |

- Der aktuelle Hamburger-Button `#nav-btn` ist ein selbst gebauter Link mit FontAwesome-Icon, der über
  jQuery `.collapse("toggle")` gesteuert wird. Er wird durch den Bootstrap-5-Standard-Toggler ersetzt
  (erfordert Anpassung in `app.js` – siehe TASK-005).
- Die Klasse `.navbar-collapse.in` (BS3-spezifisch, Zustandsklasse beim Öffnen) existiert in BS5 nicht.
  BS5 nutzt `.show` statt `.in`. Dies ist besonders relevant für die `collapse("hide")`-Aufrufe in `app.js`.

## Schritte
- [ ] `<div class="navbar navbar-inverse navbar-fixed-top">` ersetzen durch:
  ```html
  <nav class="navbar navbar-dark bg-dark navbar-fixed-top">
  ```
  (`.navbar-fixed-top` ist in BS5 umbenannt zu `.fixed-top` – anpassen)
- [ ] `<div class="navbar-header">` entfernen; Inhalt (`navbar-icon-container` und `navbar-brand`) direkt in `.container-fluid` belassen
- [ ] Den alten Hamburger-Link `#nav-btn` durch einen Standard-BS5-Toggler ersetzen:
  ```html
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Navigation öffnen">
    <span class="navbar-toggler-icon"></span>
  </button>
  ```
- [ ] `<div class="navbar-collapse collapse">` anpassen auf `<div class="collapse navbar-collapse" id="navbarMenu">`
- [ ] `<b class="caret">` aus dem Sprach-Dropdown entfernen (Bootstrap 5 generiert den Caret per CSS)
- [ ] `.navbar-nav` und `.nav` bleiben unverändert
- [ ] `app.js`-Aufruf für `#nav-btn` prüfen und ggf. entfernen (da Toggler jetzt BS5-nativ arbeitet – TASK-005)
- [ ] Responsives Verhalten der Navbar auf kleinen Bildschirmen testen (Hamburger-Menü ein-/ausklappen)

## Ergebnis
Die Navbar nutzt ausschließlich Bootstrap-5-Klassen und -Strukturen; der Hamburger-Toggler funktioniert
ohne eigene jQuery-Logik.

## Status
Todo

## Aufwand
M
