# ADR-006: GeoJSON und JSON als Datenformat für Routen und POIs

**Datum:** 2024  
**Status:** Akzeptiert

---

## Kontext

Die Kerninhalte der App – Routen und Points of Interest – müssen in einem Format vorliegen, das einfach erzeugt, versioniert und vom Browser direkt verarbeitet werden kann. Leaflet.js muss die Daten verarbeiten können.

## Entscheidung

Es werden zwei Datenformate verwendet:

### GeoJSON (`.geojson`)
- **Routen:** `service/route/<namespace>.geojson` – Linienzug (LineString) der Wegstrecke
- **POIs:** `service/poi/<namespace>.geojson` – Punktobjekte mit Properties (Name, Typ, Koordinaten, Medienreferenz)

GeoJSON wird von Leaflet.js nativ über `L.geoJson()` verarbeitet und kann direkt auf der Karte gerendert werden.

### JSON (`.json`)
- **Streckentabelle:** `service/data/<namespace>.json` – tabellarische Übersicht der Zwischenpunkte mit Zeit- und Distanzangaben, genutzt von DataTables.

### Struktur
```
service/
  route/<namespace>.geojson   → Linienzug der Route
  poi/<namespace>.geojson     → POI-Marker mit Metadaten
  data/<namespace>.json       → Tabellarische Etappendaten
  gallery/<namespace>.json    → Galerie-Konfiguration
  gpx/<namespace>.gpx         → GPX-Download für Navigation
```

## Alternativen

| Alternative | Bewertung |
|---|---|
| GPX als primäres Format | Kein nativer Leaflet-Support, kein Properties-Objekt für Metadaten |
| KML | Komplexer, schlechtere Browser-Unterstützung ohne Bibliothek |
| Eigenes JSON-Schema | Unnötige Komplexität, kein Standard-Tooling |

## Konsequenzen

**Positiv:**
- GeoJSON ist ein offener Standard, Tools wie QGIS, geojson.io und der fotopfade-service erzeugen es nativ
- Direkte Integration in Leaflet ohne Konvertierung
- Versionierbar und menschenlesbar
- GPX-Dateien können zusätzlich zum Download angeboten werden

**Negativ:**
- GeoJSON ist nicht komprimiert – bei sehr großen Routen kann die Dateigröße relevant werden
- Kein eingebautes Schema-Validierungsformat
- Pflegeaufwand: für jeden Fotopfad müssen mindestens drei Dateien angelegt werden
