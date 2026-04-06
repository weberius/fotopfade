# User-Story-011-TASK-006: `assets/js/app.js` – POI-Listeneintrag in `pois.onEachFeature` entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
In der `pois`-GeoJSON-Layer werden in `onEachFeature` für jeden POI eine Tabellenzeile in `#feature-list tbody` eingefügt. Dieser Block dient ausschließlich der Sidebar und muss entfernt werden.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Betroffener Bereich: Funktion `pois = L.geoJson(null, { … onEachFeature: … })`

## Zu entfernender Code

```js
// show number only if part of track
const propsnr = (layer.feature.properties.point === "p") ? layer.feature.properties.nr : " "
document.querySelector("#feature-list tbody").insertAdjacentHTML("beforeend",
  '<tr class="feature-row" id="'
  + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng
  + '"><td style="vertical-align: middle;">'
  + '&nbsp;'
  + '</td><td class="feature-name">'
  + layer.feature.properties.name
  + '</td><td style="vertical-align: middle;"><i class="bi bi-chevron-right float-end"></i></td></tr>');
```

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Den `const propsnr`-Block und das zugehörige `insertAdjacentHTML`-Statement in `pois.onEachFeature` entfernen
- [ ] Prüfen: Keine Referenz auf `#feature-list`, `feature-row`, `feature-name` mehr in `onEachFeature`

## Ergebnis
`pois.onEachFeature` befüllt keine Sidebar-Tabelle mehr.

## Status
Offen

## Aufwand
XS
