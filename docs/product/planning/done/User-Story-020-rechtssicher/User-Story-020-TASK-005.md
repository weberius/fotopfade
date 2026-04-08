# User-Story-020-TASK-005: Manuelle Abnahme aller Änderungen im Browser

## Zugehörige Story
User-Story-020 – Rechtssicherheit & Unterstützung

## Beschreibung
Alle Änderungen aus TASK-001 bis TASK-004 sind im Browser auf korrekte Darstellung, Funktionalität und Fehlerfreiheit zu prüfen.

## Reihenfolge
Dieser Task wird als letzter ausgeführt, nachdem TASK-001 bis TASK-004 abgeschlossen sind.

## Prüfpunkte

| Nr. | Prüfpunkt | Erwartetes Ergebnis |
|---|---|---|
| 1 | Footer anzeigen | Enthält nur noch: Impressum · Disclaimer · Datenschutz |
| 2 | Footer: „Unterstützung" suchen | Nicht vorhanden |
| 3 | Navbar (Hamburger-Menü) öffnen | Letzter Eintrag: `bi-heart`-Icon + „Unterstützung" |
| 4 | Navbar-Eintrag „Unterstützung" anklicken | Modal `#fCoffeeModal` öffnet sich korrekt |
| 5 | Modal auf PayPal-Link prüfen | Link öffnet externen Tab (kein iFrame, `target="_blank"`) |
| 6 | Modal: Wort „Spende" suchen | Nicht vorhanden — nur „Unterstützung" oder „Kaffeekasse" |
| 7 | Impressum-Link im Footer anklicken | Modal mit scrollbarem Impressum-Text öffnet sich |
| 8 | Disclaimer-Link im Footer anklicken | Modal mit scrollbarem Disclaimer-Text öffnet sich |
| 9 | Datenschutz-Link im Footer anklicken | Modal mit scrollbarem Datenschutz-Text öffnet sich |
| 10 | CSS-Prüfung: Footer-Darstellung | 3 Links gleichmäßig ausgerichtet, keine Verschiebung gegenüber vorher |
| 11 | CSS-Prüfung: Navbar-Eintrag „Unterstützung" | Optisch konsistent mit anderen Einträgen (gleicher Abstand, gleiche Schriftgröße) |
| 12 | Sprachenwechsel (falls `moers` mit EN/FR) | Navbar-Eintrag zeigt übersetzten Begriff |
| 13 | Browser-Konsole prüfen | Keine JavaScript-Fehler (kein `null`-Fehler auf alten IDs) |

## Schritte
- [ ] App im Browser starten (lokaler Webserver, z. B. `python3 -m http.server 8080`)
- [ ] Alle Prüfpunkte der Reihe nach durchgehen und abhaken
- [ ] Bei Abweichungen: zugehörigen Task erneut öffnen und korrigieren

## Status
Offen

## Aufwand
S
