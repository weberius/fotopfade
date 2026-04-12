# User-Story-022-TASK-006: Verifikation – Gesamttest aller Änderungen

## Zugehörige Story
User-Story-022 – Hilfe: Bedienungshinweise über ein Karten-Control

## Beschreibung
Abschließender manueller Browsertest aller in TASK-001 bis TASK-005
umgesetzten Änderungen. Getestet werden mindestens zwei Routen
(koeln-muelheim als Referenz + eine deutschsprachige Route) sowie
für moers die drei Sprachvarianten.

## Abhängigkeiten
TASK-001 bis TASK-005 müssen vollständig abgeschlossen sein.

## Testfälle

### TC-1: `?`-Button auf der Karte sichtbar
- [ ] App mit einer Route laden (z. B. `index.html#/koeln-muelheim`)
- [ ] `?`-Button erscheint rechts unten auf der Karte
- [ ] `?`-Button befindet sich **oberhalb** der Zoom-Buttons und des GPS-Controls

### TC-2: Hilfe-Dialog öffnet sich
- [ ] Klick auf `?` öffnet den modalen Dialog mit Überschrift „Bedienungshinweise"
- [ ] Dialog-Inhalt zeigt die vier Bedienungshinweise (GPS, Route, Über, Galerie)
- [ ] Dialog-Header zeigt X-Button zum Schliessen

### TC-3: Schliessen-Verhalten
- [ ] Klick auf X-Button schließt den Dialog
- [ ] Klick auf den Schliessen-Button im Footer schließt den Dialog
- [ ] Dialog schließt sich **nicht** von allein (kein Auto-Close)

### TC-4: Optik des `?`-Buttons
- [ ] Button folgt dem Leaflet-Control-Stil (`leaflet-bar`): abgerundete Ecken, weißer Hintergrund, schwarzer Rand
- [ ] Keine visuellen Überschneidungen mit anderen Controls

### TC-5: i18n – Deutsch
- [ ] Titel „Bedienungshinweise" korrekt
- [ ] Schliessen-Button-Label korrekt

### TC-6: i18n – Moers Englisch
- [ ] Route `index.html#/moers` laden, Sprache auf „english" wechseln
- [ ] Dialog-Titel wechselt auf „How to use"
- [ ] Inhalt der Markdown-Datei wird in Englisch angezeigt

### TC-7: i18n – Moers Französisch
- [ ] Sprache auf „français" wechseln
- [ ] Dialog-Titel wechselt auf „Guide d'utilisation"
- [ ] Inhalt der Markdown-Datei wird in Französisch angezeigt

### TC-8: Kein Einfluss auf bestehende Modals
- [ ] Alle anderen Dialoge (Geschichte, Über, Features, Quellen usw.) funktionieren unverändert
- [ ] Start-Modal wird weiterhin korrekt angezeigt

### TC-9: Zweite Route
- [ ] Mindestens eine weitere Route (z. B. `index.html#/frankenberg`) auf TC-1 bis TC-4 prüfen

## Status
Offen

## Aufwand
S
