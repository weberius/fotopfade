# User-Story-010-TASK-007: Font Awesome durch Bootstrap Icons ersetzen und CDN entfernen

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Die App bindet Font Awesome 4.4.0 ausschließlich für zwei Icons ein. Beide werden durch die bereits
vorhandene Bootstrap-Icons-Bibliothek ersetzt, sodass der Font-Awesome-CDN-Link entfällt.
Das dritte Font-Awesome-Icon (`fa-bars` im Hamburger-Button) entfällt bereits durch TASK-004.

## Technische Details
- Betroffene Dateien: `index.html`, `assets/js/app.js`
- Verbleibende Font-Awesome-Vorkommen nach TASK-004:

  | Datei | Klassen | Verwendung | Bootstrap-Icons-Ersatz |
  |---|---|---|---|
  | `app.js` (syncSidebar, ~Zeile 142) | `fa fa-chevron-right pull-right` | Pfeil in Sidebar-Tabellenzeile | `bi bi-chevron-right float-end` |
  | `app.js` (pois-onEachFeature, ~Zeile 350) | `fa fa-chevron-right pull-right` | Pfeil in Sidebar-Tabellenzeile (beim Initladen der POIs) | `bi bi-chevron-right float-end` |

- Hinweis: `.pull-right` ist eine Bootstrap-3-Klasse, die in TASK-003 in `index.html` bereits migriert
  wurde. In `app.js` (generiertes HTML) muss sie ebenfalls zu `.float-end` geändert werden.

## Schritte
- [ ] In `app.js`: beide Vorkommen von `fa fa-chevron-right pull-right` in template-Strings ersetzen:
  ```javascript
  // alt
  '<i class="fa fa-chevron-right pull-right"></i>'
  // neu
  '<i class="bi bi-chevron-right float-end"></i>'
  ```
- [ ] In `index.html`: Font-Awesome-CDN-Link entfernen:
  ```html
  <!-- entfernen: -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  ```
- [ ] Prüfen, dass kein `fa-` Klassenpräfix mehr in `index.html` oder `app.js` vorkommt
- [ ] Sidebar-Tabelle im Browser laden und Icon-Darstellung (Chevron) prüfen

## Ergebnis
Font Awesome ist vollständig entfernt; alle Icons stammen ausschließlich aus Bootstrap Icons 1.11.3.

## Status
Todo

## Aufwand
XS
