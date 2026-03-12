# ADR-004: i18next für Mehrsprachigkeit

**Datum:** 2024  
**Status:** Akzeptiert

---

## Kontext

Die Fotopfade-App soll mehrsprachig betrieben werden können. Verschiedene Nutzergruppen sprechen unterschiedliche Sprachen (Deutsch, Englisch, Französisch, Niederländisch, Russisch, Türkisch, Japanisch). UI-Texte, POI-Beschreibungen und modale Inhalte müssen sprachabhängig ausgeliefert werden.

## Entscheidung

Für die Internationalisierung wird [i18next](https://www.i18next.com/) (v23.11.1) eingesetzt, ergänzt durch:

- **i18next-http-backend** – lädt Sprachdateien asynchron aus `locales/<namespace>/<lang>/properties.json`
- **i18next-browser-languagedetector** – erkennt die Browsersprache automatisch

Die Sprache kann zusätzlich per URL-Parameter `?lng=<code>` erzwungen werden. UI-Texte (Labels, Buttons) werden über `i18next.t('key')` aufgelöst. Umfangreichere Inhalte (Modaldialoge, POI-Beschreibungen) werden als separate Markdown-Dateien per `fetch` geladen (siehe ADR-005).

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

**Negativ:**
- Asynchrones Laden erhöht Startzeit minimal
- Sprachdateien müssen für jeden Namespace und jede Sprache gepflegt werden
- Nicht alle Fotopfade unterstützen dieselben Sprachen – fehlende Dateien führen zu stillen Fallbacks
