# User-Story-010-TASK-001: Bootstrap CDN-Einbindung aktualisieren

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
In `index.html` werden die CDN-Links für Bootstrap von Version 3.3.5 auf 5.3.8 aktualisiert. Das separate Bootstrap-JS-Bundle wird durch `bootstrap.bundle.min.js` ersetzt (enthält Popper bereits). jQuery bleibt vorerst erhalten, da es in `app.js` eigenständig genutzt wird.

## Technische Details
- Betroffene Datei: `index.html`
- Bootstrap-CSS: `maxcdn.bootstrapcdn.com/bootstrap/3.3.5` → `cdn.jsdelivr.net/npm/bootstrap@5.3.8`
- Bootstrap-JS: `maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js` → `cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js`
- Das BS5-Bundle enthält Popper – kein separates Popper-Skript notwendig.
- jQuery (`cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1`) bleibt zunächst, da es für DataTables, `animate()` und Sidebar-Logik weiterhin benötigt wird.

## Schritte
- [ ] `index.html` öffnen
- [ ] Bootstrap-CSS-Link ersetzen:
  ```html
  <!-- alt -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <!-- neu -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  ```
- [ ] Bootstrap-JS-Script ersetzen:
  ```html
  <!-- alt -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <!-- neu -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
  ```
- [ ] Browser-Console nach dem Laden auf Fehler prüfen

## Ergebnis
`index.html` lädt Bootstrap 5.3.8 über CDN; keine Bootstrap-3-CDN-Referenzen mehr vorhanden.

## Status
Todo

## Aufwand
XS
