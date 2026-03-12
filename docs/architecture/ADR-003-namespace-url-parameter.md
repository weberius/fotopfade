# ADR-003: Namespace-Konzept zur Mehrfachnutzung über URL-Parameter

**Datum:** 2024  
**Status:** Akzeptiert

---

## Kontext

Die Fotopfade-App soll für mehrere unterschiedliche Fotopfade (z. B. `koeln-muelheim`, `moers`, `frankenberg`, `05315000-b03-t01`) wiederverwendet werden, ohne die Applikation selbst zu duplizieren. Routen, POIs, Bilder und Texte unterscheiden sich je nach Fotopfad.

## Entscheidung

Es wird ein **Namespace-Konzept** eingeführt. Jeder Fotopfad erhält einen eindeutigen Bezeichner (z. B. `koeln-muelheim`). Dieser Namespace steuert:

- den URL-Parameter `?id=<namespace>`
- die Pfade zu Daten-Dateien: `service/data/<namespace>.json`, `service/route/<namespace>.geojson`, `service/poi/<namespace>.geojson`
- die Pfade zu Lokalisierungsdateien: `locales/<namespace>/<lang>/<datei>.md`

Der Namespace wird beim Start aus dem URL-Parameter `id` ermittelt (`getURLParameter("id")`) oder fällt auf `config.start.id` zurück.

```
index.html?id=koeln-muelheim&lng=de
          └── namespace = "koeln-muelheim"
              ├── service/data/koeln-muelheim.json
              ├── service/route/koeln-muelheim.geojson
              ├── service/poi/koeln-muelheim.geojson
              └── locales/koeln-muelheim/de/*.md
```

## Alternativen

| Alternative | Bewertung |
|---|---|
| Separate HTML-Datei pro Fotopfad | Hohe Redundanz, schwer wartbar |
| Konfiguration per JSON-Import | Mögliche Alternative, aber mehr Komplexität im Bootstrap |
| Serverseitiges Routing | Erfordert Backend, widerspricht ADR-001 |

## Konsequenzen

**Positiv:**
- Eine einzige `index.html` für alle Fotopfade
- Neue Fotopfade durch Anlegen von Daten- und Locale-Dateien hinzufügbar
- Einfache Verlinkung auf spezifische Pfade mit Sprachauswahl

**Negativ:**
- Namespace muss in URL-Parameter oder `config.js` bekannt sein
- Fehlerhafte Namespace-IDs führen zu lautlosen Ladefehlern (404 auf Datendateien)
- Kein Namespace-Discovery-Mechanismus – Liste der Pfade ist implizit
