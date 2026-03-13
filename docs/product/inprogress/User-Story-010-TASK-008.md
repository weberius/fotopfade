# User-Story-010-TASK-008: Regressionsprüfung nach Bootstrap-5-Migration

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Nach Abschluss aller vorherigen Tasks (TASK-001 bis TASK-007) wird die vollständige Migration
manuell geprüft. Ziel ist der Nachweis, dass keine Regressionsfehler eingeführt wurden und
das bisherige Verhalten auf allen relevanten Bildschirmgrößen erhalten ist.

## Voraussetzungen
Alle Tasks TASK-001 bis TASK-007 müssen abgeschlossen sein.

## Schritte

### Netzwerk & Konsole
- [ ] Seite laden; Browser-Netzwerk-Tab: kein 404 für CDN-Ressourcen (Bootstrap 5, Bootstrap Icons)
- [ ] Browser-Console: keine JavaScript-Fehler

### Navbar
- [ ] Desktop (≥ 992 px): alle Navbar-Einträge sichtbar und klickbar (Zoom, Route, Galerie, Sprache, POIs, About)
- [ ] Mobil (< 576 px): Hamburger-Toggler öffnet und schließt das Menü; Klick auf einen Eintrag schließt das Menü

### Modals
- [ ] `startModal` öffnet beim Laden; schließt über X und Schliessen-Button; schließt automatisch nach 30 s
- [ ] `aboutModalDiv` öffnet über About-Button; alle Tabs (Erwartungen, About, Features, Links, Disclaimer) umschaltbar
- [ ] `legendModal` öffnet über Route-Button; Tabelle wird geladen und angezeigt
- [ ] `featureModal` öffnet bei Klick auf Karten-POI oder Sidebar-Zeile; schließt korrekt
- [ ] Footer-Modals: Impressum, Disclaimer, Datenschutz, Unterstützung – alle öffnen und schließen

### Karte & Sidebar
- [ ] Karte lädt mit Basislayer und Routenlinie
- [ ] Sidebar zeigt POI-Liste; Chevron-Icon (Bootstrap Icons) ist sichtbar
- [ ] Klick auf Sidebar-Zeile springt zur Karte und zeigt POI-Modal; auf Mobilgeräten verschwindet Sidebar
- [ ] Sidebar-Toggle-Button (`#sidebar-hide-btn`) ein-/ausblenden funktioniert mit Animation
- [ ] Hover über Sidebar-Zeile markiert POI auf der Karte (Desktop)

### Responsive
- [ ] Tablet (768–991 px): Navbar kollabiert; Sidebar und Karte nebeneinander
- [ ] Mobil (< 576 px): Sidebar vollständig über Karte; kein Layoutbruch

## Ergebnis
Alle Funktionen verhalten sich nach der Migration wie vor der Migration; keine Regressionsfehler
festgestellt.

## Status
Todo

## Aufwand
S
