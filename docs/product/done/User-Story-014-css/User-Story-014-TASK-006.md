# User-Story-014-TASK-006: `locales/**/properties.json` – Schlüssel `attributionTitle` in alle Sprachdateien eintragen

## Zugehörige Story
User-Story-014 – Einheitliches Erscheinungsbild der Benutzeroberfläche

## Beschreibung
Der i18n-Schlüssel `attributionTitle` wird in TASK-005 per `i18next.t('attributionTitle')` abgerufen, ist aber in keiner `properties.json` vorhanden. Er ist in alle 9 Sprachdateien einzutragen. „Attribution" ist ein Fachbegriff ohne etablierte Übersetzung und wird in allen Sprachen mit demselben Wert `"Attribution"` eingetragen.

## Technische Details
- Einfügeposition in jeder Datei: unmittelbar nach `"resourcesTitle"`

## Betroffene Dateien

| Pfad | Sprache |
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

## Einzutragender Schlüssel

```json
"attributionTitle": "Attribution",
```

## Schritte
- [x] Alle 9 `properties.json`-Dateien öffnen
- [x] `"attributionTitle": "Attribution",` jeweils nach `"resourcesTitle"` einfügen
- [x] Prüfen: `i18next.t('attributionTitle')` gibt in jeder Sprache `"Attribution"` zurück

## Ergebnis
`i18next.t('attributionTitle')` liefert in allen konfigurierten Sprachen den Wert `"Attribution"`.

## Status
Erledigt

## Aufwand
S
