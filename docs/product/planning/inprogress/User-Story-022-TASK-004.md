# User-Story-022-TASK-004: `properties.json` – i18n-Schlüssel `hilfeTitle` in allen Namespaces ergänzen

## Zugehörige Story
User-Story-022 – Hilfe: Bedienungshinweise über ein Karten-Control

## Beschreibung
Der neue Hilfe-Dialog benötigt den Schlüssel `hilfeTitle` in den `properties.json`
aller Namespaces und Sprachen. Moers erhält den Schlüssel in allen drei Sprachen
(de/en/fr) mit einer jeweils sprachlich passenden Übersetzung.

## Technische Details
- Einfügeposition: nach dem bestehenden Schlüssel `"tourStarten"` (wo vorhanden),
  sonst nach `"unterstuetzung"` / `"unterstuetzung"`-Äquivalent
- Wert deutsch: `"Bedienungshinweise"`
- Wert englisch: `"How to use"`
- Wert französisch: `"Guide d'utilisation"`

## Zu ändernde Dateien

| Datei | Eintrag |
|---|---|
| `locales/frankenberg/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/fritzlar/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/homberg/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/koeln-innenstadt/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/koeln-muelheim/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/korbach/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/moers/de/properties.json` | `"hilfeTitle": "Bedienungshinweise"` |
| `locales/moers/en/properties.json` | `"hilfeTitle": "How to use"` |
| `locales/moers/fr/properties.json` | `"hilfeTitle": "Guide d'utilisation"` |

## Kontext (Umgebung der Einfügstelle, deutschsprachige Dateien)

```json
  "tourStarten": "Tour starten",
  "hilfeTitle": "Bedienungshinweise",
  "languages": ["de"]
```

## Kontext (Umgebung der Einfügstelle, moers/en)

```json
  "unterstuetzung": "Support",
  "hilfeTitle": "How to use",
  "languages": ["de", "en", "fr"]
```

## Kontext (Umgebung der Einfügstelle, moers/fr)

```json
  "unterstuetzung": "Soutien",
  "hilfeTitle": "Guide d'utilisation",
  "languages": ["de", "en", "fr"]
```

## Hinweis
Bei Dateien ohne `tourStarten`-Schlüssel (moers/en, moers/fr) wird `hilfeTitle`
nach dem letzten bestehenden Schlüssel vor `"languages"` eingefügt.

## Schritte
- [ ] `locales/frankenberg/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/fritzlar/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/homberg/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/koeln-innenstadt/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/koeln-muelheim/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/korbach/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/moers/de/properties.json` – Schlüssel ergänzt
- [ ] `locales/moers/en/properties.json` – englischer Schlüssel ergänzt
- [ ] `locales/moers/fr/properties.json` – französischer Schlüssel ergänzt
- [ ] JSON-Syntax in allen Dateien geprüft (kein fehlendes Komma, kein Trailing Comma)

## Status
Offen

## Aufwand
S
