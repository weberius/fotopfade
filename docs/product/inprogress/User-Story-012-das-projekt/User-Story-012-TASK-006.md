# User-Story-012-TASK-006: `locales/**/properties.json` – Neue i18n-Schlüssel ergänzen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
In allen `properties.json`-Dateien (eine je Locale-Sprach-Kombination) die 10 neuen i18n-Schlüssel ergänzen: je einen für den Menüeintrags-Span und den Modal-Titel der fünf neuen Dialoge. Gleichzeitig werden die **zwei toten Schlüssel** `about` und `welcomeModelTitle` entfernt, da beide nach TASK-001 (`about-btn` → 5 neue Buttons) und TASK-002 (`#aboutModalDiv` → 5 separate Modals) keinerlei DOM-Element mehr ansprechen und in `locale.js` (TASK-005) nicht mehr referenziert werden.

## Technische Details
- Betroffene Dateien (9 Dateien):

| Datei | Sprache |
|---|---|
| `locales/frankenberg/de/properties.json` | Deutsch |
| `locales/fritzlar/de/properties.json` | Deutsch |
| `locales/homberg/de/properties.json` | Deutsch |
| `locales/koeln-innenstadt/de/properties.json` | Deutsch |
| `locales/koeln-muelheim/de/properties.json` | Deutsch |
| `locales/korbach/de/properties.json` | Deutsch |
| `locales/moers/de/properties.json` | Deutsch |
| `locales/moers/en/properties.json` | Englisch |
| `locales/moers/fr/properties.json` | Französisch |

## Neue Schlüssel

### Deutsch (`de`) – zu verwendende Werte

```json
"geschichte": "Geschichte",
"geschichteTitle": "Geschichte",
"ueber": "Über das Projekt",
"ueberTitle": "Über das Projekt",
"features": "Features",
"featuresTitle": "Features",
"links": "QR-Code",
"linksTitle": "QR-Code",
"resources": "Quellen",
"resourcesTitle": "Quellen"
```

### Englisch (`en`) – Moers

```json
"geschichte": "History",
"geschichteTitle": "History",
"ueber": "About the project",
"ueberTitle": "About the project",
"features": "Features",
"featuresTitle": "Features",
"links": "QR code",
"linksTitle": "QR code",
"resources": "Sources",
"resourcesTitle": "Sources"
```

### Französisch (`fr`) – Moers

```json
"geschichte": "Histoire",
"geschichteTitle": "Histoire",
"ueber": "À propos du projet",
"ueberTitle": "À propos du projet",
"features": "Fonctionnalités",
"featuresTitle": "Fonctionnalités",
"links": "QR code",
"linksTitle": "QR code",
"resources": "Sources",
"resourcesTitle": "Sources"
```

## Zu entfernende tote Schlüssel

Nach der Umsetzung von TASK-001, TASK-002 und TASK-005 gibt es in keiner Datei mehr eine Referenz auf:

| Schlüssel | Bisherige Verwendung | Grund für Entfernung |
|---|---|---|
| `about` | `locale.js` → `document.getElementById('aboutSelectorSpan')` | `aboutSelectorSpan` wird in TASK-001 entfernt; TASK-005 ersetzt ihn durch `geschichteSelectorSpan` etc. |
| `welcomeModelTitle` | `locale.js` → `document.getElementById('welcomeModelTitle')` | Span `welcomeModelTitle` gehört zu `#aboutModalDiv`, der in TASK-002 entfernt wird |

Beide Schlüssel werden aus allen 9 Dateien gelöscht.

## Schritte
- [ ] `locales/frankenberg/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/fritzlar/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/homberg/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/koeln-innenstadt/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/koeln-muelheim/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/korbach/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/moers/de/properties.json` – 10 neue Schlüssel ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/moers/en/properties.json` – 10 neue Schlüssel in Englisch ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] `locales/moers/fr/properties.json` – 10 neue Schlüssel in Französisch ergänzen; `about` und `welcomeModelTitle` entfernen
- [ ] Prüfen: Alle 9 Dateien sind valides JSON (kein fehlendes Komma, kein doppelter Schlüssel)
- [ ] Prüfen: Kein Vorkommen von `"about"` oder `"welcomeModelTitle"` in den Dateien mehr vorhanden

## Reihenfolge
Dieser Task kann **parallel zu TASK-001 bis TASK-005** bearbeitet werden, da er keine Abhängigkeit zu den HTML/JS-Änderungen hat. Er muss jedoch **vor dem Integrationstest** abgeschlossen sein.

## Ergebnis
Alle Locale-Dateien enthalten die neuen Schlüssel; die fünf Menüeintrags-Spans und Modal-Titel werden in allen unterstützten Sprachen korrekt lokalisiert. Keine toten Schlüssel (`about`, `welcomeModelTitle`) mehr in den Dateien.

## Status
Offen

## Aufwand
S
