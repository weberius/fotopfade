# ADR-004: i18next für Mehrsprachigkeit

**Datum:** 2024  
**Status:** Akzeptiert  
**Ergänzt:** 2026-04 (User-Story-024 — Sprachpräferenz-Persistenz)

---

## Kontext

Die Fotopfade-App soll mehrsprachig betrieben werden können. Verschiedene Nutzergruppen sprechen unterschiedliche Sprachen (Deutsch, Englisch, Französisch, Niederländisch, Russisch, Türkisch, Japanisch). UI-Texte, POI-Beschreibungen und modale Inhalte müssen sprachabhängig ausgeliefert werden.

## Entscheidung

Für die Internationalisierung wird [i18next](https://www.i18next.com/) (v23.11.1) eingesetzt, ergänzt durch:

- **i18next-http-backend** – lädt Sprachdateien asynchron aus `locales/<namespace>/<lang>/properties.json`
- **i18next-browser-languagedetector** – erkennt die Browsersprache automatisch

### Startsprache-Priorität (ab User-Story-024)

Die Startsprache wird in `assets/js/config.js` nach folgender Priorität ermittelt:

1. URL-Parameter `?lng=<code>` — höchste Priorität (z.B. für Sharing-Links)
2. `localStorage` unter dem Schlüssel `fotopfade_language` — gespeicherte Nutzerpräferenz
3. `navigator.language` — Browser-Sprache
4. Fallback `de`

Die detaillierte Entscheidung zur `localStorage`-Persistenz ist in ADR-015 dokumentiert.

### Sprachumschaltung zur Laufzeit

UI-Texte (Labels, Buttons) werden über `i18next.t('key')` aufgelöst. Umfangreichere Inhalte (Modaldialoge, POI-Beschreibungen) werden als separate Markdown-Dateien per `fetch` geladen (siehe ADR-005). Bei manueller Sprachauswahl wird `i18next.changeLanguage()` aufgerufen, anschließend `updateContent()` neu ausgeführt und die Auswahl in `localStorage` gespeichert.

### `languageCode`-Variable

Die globale Variable `languageCode` hält immer den zweistelligen ISO-639-1-Code (`de`, `en`, `fr`) ohne Regionalteil. Sie wird nach Init und nach jedem Sprachwechsel gesetzt: `languageCode = i18next.language.split('-')[0]`. Sie wird für alle `locales/<namespace>/<lang>/`-Dateipfade in `app.js` verwendet.

## Alternativen

| Alternative | Bewertung |
|---|---|
| Eigener einfacher i18n-Mechanismus | Weniger Features, höherer Entwicklungsaufwand |
| Format.js / react-intl | Zu sehr auf React ausgerichtet |
| Mehrere statische HTML-Dateien pro Sprache | Extrem hohe Redundanz |

## Konsequenzen

**Positiv:**
- Browsersprache wird automatisch erkannt und angewendet
- Fallback-Sprache (`de`) konfigurierbar
- Sprachumschaltung zur Laufzeit möglich
- Etablierte Bibliothek mit breitem Ökosystem
- Manuelle Sprachauswahl bleibt über Seitenladevorgänge hinweg erhalten

**Negativ:**
- Asynchrones Laden erhöht Startzeit minimal
- Sprachdateien müssen für jeden Namespace und jede Sprache gepflegt werden
- Nicht alle Fotopfade unterstützen dieselben Sprachen – fehlende Dateien führen zu stillen Fallbacks
