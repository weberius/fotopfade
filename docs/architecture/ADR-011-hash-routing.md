# ADR-011: Hash-Routing für Namespace-URL-Konvention

**Datum:** 2026-04  
**Status:** Akzeptiert  
**Ersetzt:** ADR-003

---

## Kontext

ADR-003 legt `?id=<namespace>` als URL-Konvention fest. Diese URL-Form ist funktional korrekt, wirkt aber technisch und wenig nutzerfreundlich. User-Story-019 fordert eine sprechende, lesbare URL-Form.

Für eine vollständig statische Single-Page-App auf GitHub Pages (ADR-001) stehen zwei Optionen für lesbare URLs zur Wahl:

| Option | Beispiel-URL | GitHub Pages |
|---|---|---|
| Echter URL-Pfad | `/fotopfade/koeln-muelheim` | Benötigt serverseitige Rewrite-Regel oder 404-Hack – fragil |
| Hash-Routing | `index.html#/koeln-muelheim` | Funktioniert ohne Serverkonfiguration sofort |

## Entscheidung

Der Namespace wird über einen **Hash-Pfad** der Form `index.html#/<namespace>` übergeben.

- `window.location.hash` wird in `assets/js/config.js` durch einen IIFE ausgewertet, der die globale Variable `namespace` setzt.
- Die Namespace-Auflösung folgt dieser Prioritätsreihenfolge:
  1. Hash-Pfad (`window.location.hash`, z. B. `#/koeln-muelheim`)
  2. Default-Namespace (Literalwert in Zeile 1 von `config.js`)
- **Abwärtskompatibilität:** Alte `?id=`-Links werden in `app.js` beim Seitenstart per `window.location.replace()` auf die entsprechende Hash-URL weitergeleitet. Kein `?id=`-Quellcode bleibt in der regulären Namespace-Auflösung erhalten.

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
| Echter URL-Pfad (`/koeln-muelheim`) | Erfordert Serverkonfiguration; auf GitHub Pages nur mit 404-Hack möglich → fragil und nicht wartbar |
| `?id=` Query-Parameter (ADR-003, abgelöst) | Funktional, aber URL wirkt technisch und ist schwer zu teilen |
| Unterverzeichnisse mit je einer `index.html` | Hohe Redundanz, schwer wartbar, widerspricht ADR-001 |

## Konsequenzen

**Positiv:**
- Funktioniert auf GitHub Pages ohne jede Serverkonfiguration sofort
- URL ist für Nutzer lesbar und kann problemlos geteilt werden
- Seiten-Reload (`F5`) führt zu keinem 404-Fehler
- Abwärtskompatibilität für bestehende `?id=`-Links ist sichergestellt
- Die Datenstruktur und Pfadkonventionen aus ADR-003 (Namespace-Konzept) bleiben vollständig erhalten

**Negativ:**
- Hash-Routing ist per Convention nicht für Server-Side-Rendering vorgesehen (hier nicht relevant, da ADR-001)
- Der `#`-Teil der URL wird von einigen Analytics-Tools und HTTP-Servern im Zugriffs-Log nicht erfasst (bekannt, akzeptiert)
- `window.location.replace()` stoppt JavaScript nicht synchron: Bei alten `?id=`-Links wird die App kurz initialisiert, bevor der Browser auf die Hash-URL navigiert – akzeptabel, da einmalig und nur für Legacy-Links

## Beziehung zu anderen ADRs

| ADR | Beziehung |
|---|---|
| ADR-001 | Kein Widerspruch; statisches Hosting, kein Serverbedarf |
| ADR-003 | Wird durch dieses ADR abgelöst; Namespace-Konzept und Datenpfad-Struktur bleiben gültig |
| ADR-004 | Kein Widerspruch; `?lng=` bleibt als Query-Parameter für die Sprachsteuerung gültig |
| ADR-006 | Kein Widerspruch; Service-Datei-Pfade basieren weiterhin auf `namespace` |
