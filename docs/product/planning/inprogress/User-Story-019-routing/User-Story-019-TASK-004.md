# User-Story-019-TASK-004: ADR-003 auf „Superseded" setzen und ADR-011 für Hash-Routing anlegen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
ADR-003 dokumentiert `?id=<namespace>` als verbindliche URL-Konvention. Nach User-Story-019 ist die neue primäre URL-Konvention `index.html#/<namespace>`. Diese architektonische Entscheidung – Hash-Routing statt echtem Path-Routing – ist ausreichend begründungswürdig, um ein eigenes ADR zu erhalten.

ADR-003 wird auf Status „Superseded by ADR-011" gesetzt. ADR-011 dokumentiert die neue Entscheidung.

## Technische Details
- Betroffene Datei 1: `docs/architecture/ADR-003-namespace-url-parameter.md`
- Betroffene Datei 2 (neu): `docs/architecture/ADR-011-hash-routing.md`

---

## Änderung 1 – ADR-003: Status auf „Superseded" setzen

```markdown
**Status:** Superseded by ADR-011 (2026-04)
```

Der restliche Inhalt von ADR-003 bleibt erhalten (historische Dokumentation).

---

## Änderung 2 – ADR-011 anlegen

Datei: `docs/architecture/ADR-011-hash-routing.md`

```markdown
# ADR-011: Hash-Routing für Namespace-URL-Konvention

**Datum:** 2026-04  
**Status:** Akzeptiert  
**Ersetzt:** ADR-003

---

## Kontext

ADR-003 legt `?id=<namespace>` als URL-Konvention fest. Diese URL-Form ist funktional korrekt,
wirkt aber technisch und wenig nutzerfreundlich. User-Story-019 fordert eine sprechende,
lesbare URL-Form.

Für eine statische Single-Page-App auf GitHub Pages (ADR-001) stehen zwei Optionen zur Wahl:

| Option | Beispiel-URL | GitHub Pages |
|---|---|---|
| Echter URL-Pfad | `/fotopfade/koeln-muelheim` | Benötigt serverseitige Rewrite-Regel oder 404-Hack |
| Hash-Routing | `index.html#/koeln-muelheim` | Funktioniert ohne Serverkonfiguration sofort |

## Entscheidung

Der Namespace wird über einen **Hash-Pfad** übergeben: `index.html#/<namespace>`.

- `window.location.hash` wird in `config.js` ausgewertet (IIFE-Muster).
- Der Namespace-Auflösungsorder ist: **Hash > Default-Wert in config.js**.
- Abwärtskompatibilität: Alte `?id=`-Links werden in `app.js` via `window.location.replace()` auf die
  entsprechende Hash-URL weitergeleitet.

```
index.html#/koeln-muelheim
          └── namespace = "koeln-muelheim"
              ├── service/data/koeln-muelheim.json
              ├── service/route/koeln-muelheim.geojson
              ├── service/poi/koeln-muelheim.geojson
              └── locales/koeln-muelheim/de/*.md
```

## Alternativen

| Alternative | Bewertung |
|---|---|
| Echter URL-Pfad (`/koeln-muelheim`) | Erfordert Serverkonfiguration, auf GitHub Pages nur mit 404-Hack möglich → fragil |
| `?id=` Query-Parameter (bisherig, ADR-003) | Funktional, aber URL wirkt technisch und schwer zu teilen |
| Unterverzeichnisse mit je einer `index.html` | Hohe Redundanz, schwer wartbar |

## Konsequenzen

**Positiv:**
- Funktioniert auf GitHub Pages ohne Serverkonfiguration sofort
- URL ist lesbar und kann einfach geteilt werden
- Seiten-Reload führt zu keinem 404
- Abwärtskompatibilität für bestehende `?id=`-Links ist gewährleistet

**Negativ:**
- Hash-URLs sind per Konvention nicht für Server-Side-Rendering gedacht (hier nicht relevant)
- Der `#`-Teil der URL wird von einigen Analytics-Tools nicht erfasst (Accept as Known)
```

---

## Schritte
- [ ] `docs/architecture/ADR-003-namespace-url-parameter.md` öffnen und Status auf `Superseded by ADR-011 (2026-04)` setzen
- [ ] `docs/architecture/ADR-011-hash-routing.md` mit dem obigen Inhalt anlegen
- [ ] Prüfen: `docs/architecture/README.md` existiert – ggf. ADR-011 in die Übersicht eintragen

## Status
Offen

## Aufwand
S
