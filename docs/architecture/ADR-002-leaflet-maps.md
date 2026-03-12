# ADR-002: Leaflet.js als Kartenbibliothek

**Datum:** 2024  
**Status:** Akzeptiert

---

## Kontext

Kernfunktion der App ist die interaktive Kartenansicht mit Routendarstellung, POI-Markern, Clustering, Standortanzeige und austauschbaren Kartenebenen (Layer). Es wird eine JavaScript-Kartenbibliothek benötigt, die sich gut in eine statische Webapp integrieren lässt.

## Entscheidung

Als Kartenbibliothek wird [Leaflet.js](https://leafletjs.com/) (v1.9.4) eingesetzt. Ergänzt wird es durch folgende Plugins:

- **leaflet.markercluster** – Clustering von POI-Markern
- **L.Control.Locate** – Standortanzeige des Nutzers
- **leaflet.groupedlayercontrol** – Gruppierte Layer-Auswahl (lokal eingebunden)

Kartenkacheln werden über externe Tile-Provider bezogen (OpenStreetMap u. a.).

## Alternativen

| Alternative | Bewertung |
|---|---|
| Google Maps API | Kostenpflichtig ab Schwellenwert, proprietär, Datenschutz-Bedenken |
| Mapbox GL JS | Leistungsfähiger, aber komplexer und API-Key erforderlich |
| OpenLayers | Mächtiger, aber steile Lernkurve, größeres Bundle |

## Konsequenzen

**Positiv:**
- Open Source, keine API-Kosten
- Große Plugin-Ökosystem
- Leichtgewichtig und mobilfreundlich
- Gute Dokumentation und Community

**Negativ:**
- Kein natives WebGL-Rendering (kein Vektorkacheln-Support ohne Plugins)
- Tile-Provider muss separat ausgewählt und ggf. attributiert werden
- Abhängigkeit von CDN-Verfügbarkeit der Bibliothek
