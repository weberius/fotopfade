# Architecture Decision Records – Fotopfade Webapp

Dieses Verzeichnis enthält Architecture Decision Records (ADRs) für die Fotopfade Webapp.

ADRs dokumentieren architektonisch relevante Entscheidungen, die im Laufe der Entwicklung getroffen wurden – inklusive Kontext, Alternativen und Konsequenzen.

## Format

Jeder ADR folgt dem Schema:

- **Titel** – kurze Beschreibung der Entscheidung
- **Status** – `Vorgeschlagen` | `Akzeptiert` | `Abgelehnt` | `Ersetzt`
- **Kontext** – Warum war eine Entscheidung nötig?
- **Entscheidung** – Was wurde entschieden?
- **Alternativen** – Welche Optionen wurden abgewogen?
- **Konsequenzen** – Was sind die Auswirkungen dieser Entscheidung?

## Übersicht

| Nr.  | Titel | Status |
|------|-------|--------|
| [ADR-001](ADR-001-static-webapp.md) | Statische Single-Page-Webapp ohne Backend | Akzeptiert |
| [ADR-002](ADR-002-leaflet-maps.md) | Leaflet.js als Kartenbibliothek | Akzeptiert |
| [ADR-003](ADR-003-namespace-url-parameter.md) | Namespace-Konzept zur Mehrfachnutzung über URL-Parameter | Superseded by ADR-011 |
| [ADR-004](ADR-004-i18next-lokalisierung.md) | i18next für Mehrsprachigkeit | Akzeptiert |
| [ADR-005](ADR-005-markdown-modal-inhalte.md) | Markdown-Dateien für modale Dialoginhalte | Akzeptiert |
| [ADR-006](ADR-006-geojson-service-daten.md) | GeoJSON und JSON als Datenformat für Routen und POIs | Akzeptiert |
| [ADR-007](ADR-007-paypal-unterstuetzung.md) | PayPal-Link statt Zahlungsformular für Projektunterstützung | Akzeptiert |
| [ADR-008](ADR-008-locale-fragment-loading.md) | Bedarfsgesteuertes Laden von Locale-Fragmenten via ModalBuilder | Akzeptiert |
| [ADR-009](ADR-009-datatables-jquery-abhaengigkeit.md) | DataTables CDN-Build erfordert jQuery als Peer-Abhängigkeit | Akzeptiert |
| [ADR-010](ADR-010-eigenstaendige-projekt-dialoge.md) | Eigenständige modale Dialoge für Projektinhalte statt Tab-Navigation | Akzeptiert |
| [ADR-011](ADR-011-hash-routing.md) | Hash-Routing für Namespace-URL-Konvention | Akzeptiert |
