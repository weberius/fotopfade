# User-Story-019-TASK-006: Manuelle Abnahme aller Routing-Änderungen im Browser

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
Alle Änderungen aus TASK-001 bis TASK-004 sind im Browser auf korrektes Routing-Verhalten, Abwärtskompatibilität und Fehlerfreiheit zu prüfen.

## Reihenfolge
Dieser Task wird als letzter ausgeführt, nachdem TASK-001 bis TASK-005 abgeschlossen sind.

## Prüfpunkte

| Nr. | URL / Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | `index.html#/koeln-muelheim` aufrufen | Fotopfad Köln Mülheim wird korrekt geladen |
| 2 | `index.html#/moers` aufrufen | Fotopfad Moers wird korrekt geladen |
| 3 | `index.html?id=koeln-muelheim` aufrufen | Redirect auf `index.html#/koeln-muelheim`, Fotopfad lädt korrekt |
| 4 | `index.html` ohne Parameter aufrufen | Default-Fotopfad (`koeln-muelheim`) wird geladen |
| 5 | Seite mit `index.html#/koeln-muelheim` neu laden (F5) | Kein 404, Fotopfad lädt korrekt |
| 6 | Burger-Menü → „Route" anklicken | Datentabelle lädt mit Daten des aktiven Fotopfads |
| 7 | Download-Funktion nutzen | URL enthält den korrekten Namespace |
| 8 | Browser-Konsole prüfen | Keine JavaScript-Fehler |

## Schritte
- [ ] App im Browser starten (lokaler Webserver, z. B. `python3 -m http.server`)
- [ ] Alle Prüfpunkte der Reihe nach durchgehen und abhaken
- [ ] Bei Abweichungen: zugehörigen Task erneut öffnen und korrigieren

## Status
Offen

## Aufwand
S
