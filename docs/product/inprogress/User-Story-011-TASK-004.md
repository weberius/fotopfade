# User-Story-011-TASK-004: `assets/js/app.js` – `featureList`, `delegatedMouseout` und Feature-Row-Handler entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Die Variable `featureList`, die Hilfsfunktion `delegatedMouseout` sowie alle Event-Handler, die auf `.feature-row`-Elemente der Sidebar reagieren, aus `app.js` entfernen.

## Technische Details
- Betroffene Datei: `assets/js/app.js`

## Zu entfernende Code-Stellen

**Zeile 2** – `featureList` aus der `let`-Deklaration entfernen:
```js
// vorher
let urlroute, urlpoi, featureList;
// nachher
let urlroute, urlpoi;
```

**Zeilen 15–20** – `delegatedMouseout`-Funktion entfernen:
```js
function delegatedMouseout(e) {
  if (e.target.closest(".feature-row")) {
    clearHighlight();
  }
}
```

**Zeilen 22–28** – Click-Handler für `.feature-row` entfernen:
```js
document.addEventListener("click", function(e) {
  const row = e.target.closest(".feature-row");
  if (row) {
    document.removeEventListener("mouseout", delegatedMouseout);
    sidebarClick(parseInt(row.getAttribute("id"), 10));
  }
});
```

**Zeilen 30–37** – Mouseover-Handler für `.feature-row` entfernen:
```js
if ( !("ontouchstart" in window) ) {
  document.addEventListener("mouseover", function(e) {
    const row = e.target.closest(".feature-row");
    if (row) {
      highlight.clearLayers().addLayer(L.circleMarker([row.getAttribute("lat"), row.getAttribute("lng")], highlightStyle));
    }
  });
}
```

**Zeile 39** – mouseout-Listener entfernen:
```js
document.addEventListener("mouseout", delegatedMouseout);
```

**Im `featureModal` hidden-Listener** (Ende der Datei) – `delegatedMouseout`-Aufruf entfernen:
```js
document.getElementById("featureModal").addEventListener("hidden.bs.modal", function(e) {
  document.addEventListener("mouseout", delegatedMouseout);  // ← diese Zeile entfernen
});
```
Wenn der Listener danach leer ist, kann der gesamte Block entfernt werden.

## Schritte
- [ ] `featureList` aus der `let urlroute, urlpoi, featureList;`-Deklaration entfernen
- [ ] `delegatedMouseout`-Funktion entfernen
- [ ] Click-Handler für `.feature-row` entfernen
- [ ] Mouseover-Handler für `.feature-row` entfernen
- [ ] `document.addEventListener("mouseout", delegatedMouseout)` entfernen
- [ ] Im `featureModal`-Handler den `delegatedMouseout`-Aufruf entfernen (ggf. gesamten leeren Listener entfernen)
- [ ] Prüfen: Keine Referenz auf `delegatedMouseout`, `feature-row`, `featureList` mehr vorhanden

## Ergebnis
Keine sidebar-abhängigen Event-Handler und Variablen mehr in `app.js`.

## Status
Offen

## Aufwand
S
