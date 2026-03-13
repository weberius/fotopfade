# User-Story-010-TASK-006: Icon-Bibliotheken konsolidieren und Regressionsprüfung

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Die App bindet aktuell zwei Icon-Bibliotheken ein: **Font Awesome 4.4.0** und **Bootstrap Icons 1.11.3**.
Da Bootstrap 5 keine Glyphicons mehr enthält, wird geprüft, welche Icons tatsächlich verwendet werden
und ob eine der beiden Bibliotheken entfernt oder konsolidiert werden kann.
Abschließend erfolgt eine vollständige visuelle Regressionsprüfung nach der Bootstrap-5-Migration.

## Technische Details
- Betroffene Dateien: `index.html`, `assets/js/app.js`
- Font Awesome 4.4.0 wird verwendet für:
  - `.fa.fa-bars.fa-lg.white` (Navbar-Hamburger – entfällt nach TASK-004)
  - `.fa.fa-chevron-right.pull-right` in `syncSidebar()` (app.js, Zeile ~142)
- Bootstrap Icons 1.11.3 wird verwendet für:
  - `.bi.bi-play-fill`, `.bi.bi-table`, `.bi.bi-images`, `.bi.bi-globe2`,
    `.bi.bi-layout-text-sidebar`, `.bi.bi-question-circle` (Navbar)
  - `.bi.bi-chevron-left` (`#sidebar-hide-btn`)
- Bootstrap Icons enthält ein Chevron-Right (`bi bi-chevron-right`), das `fa-chevron-right` ersetzen kann.
- Font Awesome 4.4.0 ist eine sehr alte Version (2014); Bootstrap Icons deckt alle genutzten Icons ab.

## Schritte

### Icon-Konsolidierung
- [ ] Vorkommen von Font-Awesome-Klassen in `index.html` und `app.js` inventarisieren:
  - `fa fa-bars` → Navbar-Hamburger (entfällt durch BS5-Toggler in TASK-004)
  - `fa fa-chevron-right` in `syncSidebar()` in `app.js`
- [ ] `fa fa-chevron-right pull-right` in `syncSidebar()` (app.js) ersetzen durch `bi bi-chevron-right float-end`
- [ ] Nach Ersatz aller Font-Awesome-Vorkommen: Font-Awesome-CDN-Link aus `index.html` entfernen:
  ```html
  <!-- entfernen: -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  ```
- [ ] Sicherstellen, dass Bootstrap-Icons-CDN auf aktuelle Version zeigt (aktuell: 1.11.3 ✓)

### Regressionsprüfung
- [ ] **Desktop (≥ 992 px):** Navbar vollständig sichtbar, alle Menüpunkte klickbar; Sidebar links;
  Kartenbereich rechts; alle Modals öffnen und schließen korrekt; Tabs im About-Modal funktionieren
- [ ] **Tablet (768–991 px):** Navbar kollabiert korrekt; Hamburger-Toggler öffnet/schließt das Menü;
  Grid-Layout der Sidebar responsiv
- [ ] **Smartphone (< 576 px):** Hamburger-Menü funktioniert; Sidebar verschwindet beim POI-Klick;
  Modals nehmen volle Breite ein
- [ ] **Modals:** startModal, aboutModalDiv (inkl. Tabs), legendModal, featureModal, attributionModal,
  fImpressumModal, fDisclaimerModal, fDatenschutzModal, fCoffeeModal – jeweils öffnen und schließen
- [ ] **Browser-Konsole:** Keine neuen JavaScript-Fehler nach der vollständigen Migration
- [ ] **Netzwerk-Tab:** Kein 404 für CDN-Ressourcen

## Ergebnis
Nur noch Bootstrap Icons als Icon-Bibliothek eingebunden; Font Awesome entfernt.
Bootstrap-5-Migration visuell und funktional validiert; keine Regressionen.

## Status
Todo

## Aufwand
M
