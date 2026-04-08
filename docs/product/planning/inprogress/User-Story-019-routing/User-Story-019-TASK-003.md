# User-Story-019-TASK-003: `assets/js/app.js` – `legend-btn`-Click-Handler: direkte `getURLParameter("id")`-Aufrufe durch `namespace` ersetzen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
Im Click-Handler von `legend-btn` (Zeilen 60–62) wird `getURLParameter("id")` direkt zur URL-Konstruktion verwendet, anstatt die globale Variable `namespace` zu nutzen. Nach Umstieg auf Hash-Routing würde `getURLParameter("id")` immer `null` zurückgeben und die Datentabelle nicht laden.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Betroffene Zeilen: ~60–62

## Zu ändernder Code

```js
// vorher
var urldata = getURLParameter("id")
    ? "service/data/" + getURLParameter("id") + ".json"
    : "service/data/" + namespace + ".json";
```

```js
// nachher
var urldata = "service/data/" + namespace + ".json";
```

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Die dreiteilige ternäre Konstruktion in Zeile ~60–62 durch die vereinfachte Zeile ersetzen
- [ ] Prüfen: Klick auf „Route" öffnet die Datentabelle mit den korrekten Daten des aktiven Fotopfads

## Status
Offen

## Aufwand
XS
