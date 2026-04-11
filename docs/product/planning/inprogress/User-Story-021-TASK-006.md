# User-Story-021-TASK-006: `properties.json` – i18n-Schlüssel `tourStarten` in allen 7 Namespaces ergänzen

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Der neue CTA-Button „Tour starten" benötigt einen i18n-Schlüssel in `properties.json` aller sieben Routen. Derzeit fehlt der Schlüssel `tourStarten` überall. Er wird in jeder `properties.json` ergänzt.

## Technische Details
- Zu ändernde Dateien (7 Stück):
  - `locales/frankenberg/de/properties.json`
  - `locales/fritzlar/de/properties.json`
  - `locales/homberg/de/properties.json`
  - `locales/koeln-innenstadt/de/properties.json`
  - `locales/koeln-muelheim/de/properties.json`
  - `locales/korbach/de/properties.json`
  - `locales/moers/de/properties.json`
- Einfügeposition: nach dem bestehenden Schlüssel `"unterstuetzung"`

## Einzufügender JSON-Eintrag

```json
"tourStarten": "Tour starten",
```

## Kontext (Umgebung der Einfügstelle)

```json
  "unterstuetzung": "Unterstützung",
  "tourStarten": "Tour starten",
```

## Hinweis
Falls eine `properties.json` den Schlüssel `"unterstuetzung"` noch nicht enthält (ältere Routen), wird `tourStarten` als letzter Eintrag vor der schließenden `}` eingefügt.

## Schritte
- [ ] `locales/frankenberg/de/properties.json` – Schlüssel ergänzen
- [ ] `locales/fritzlar/de/properties.json` – Schlüssel ergänzen
- [ ] `locales/homberg/de/properties.json` – Schlüssel ergänzen
- [ ] `locales/koeln-innenstadt/de/properties.json` – Schlüssel ergänzen
- [ ] `locales/koeln-muelheim/de/properties.json` – Schlüssel ergänzen
- [ ] `locales/korbach/de/properties.json` – Schlüssel ergänzen
- [ ] `locales/moers/de/properties.json` – Schlüssel ergänzen
- [ ] JSON-Syntax in allen Dateien prüfen (kein abschließendes Komma beim letzten Eintrag)

## Status
Offen

## Aufwand
S
