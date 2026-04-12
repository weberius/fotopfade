# User-Story-022-TASK-002: `assets/js/app.js` + `assets/css/app.css` – Leaflet-Control `HelpControl` für Hilfe-Button

## Zugehörige Story
User-Story-022 – Hilfe: Bedienungshinweise über ein Karten-Control

## Beschreibung
Ein benutzerdefiniertes Leaflet-Control (`HelpControl`) wird als `?`-Button
direkt auf der Karte platziert. Es öffnet beim Klick den Hilfe-Dialog
`#hilfeModalDiv`. Das Control erscheint an der Position `bottomright`,
**oberhalb** der übrigen `bottomright`-Controls (Attribution, Zoom, GPS).

**Stapelreihenfolge `bottomright` in Leaflet:**
Leaflet fügt Controls für untere Ecken mit `insertBefore(el, corner.firstChild)` ein –
jedes neue Control landet im DOM **vor** dem bisherigen ersten Kind und erscheint
daher **visuell höher** (weiter vom Rand entfernt). Das **zuletzt** hinzugefügte
Control ist damit das oberste. Damit `HelpControl` oberhalb von Zoom und GPS
erscheint, muss es **nach** `zoomControl` und `locateControl` zur Karte
hinzugefügt werden.

**Styling:**
Die CSS-Klasse `leaflet-bar` des Leaflet-Standards stellt bereits Breite, Höhe,
`line-height`, `display: block`, Zentrierung, Textdekoration, Farbe und
Hintergrund des `<a>`-Elements bereit. Nur die additive Hervorhebung
(`font-weight` und `font-size`) wird über eine eigene CSS-Klasse
`leaflet-control-hilfe-btn` in `app.css` gesteuert – keine Inline-Styles.

## Technische Details
- Betroffene Dateien: `assets/js/app.js`, `assets/css/app.css`
- Einfügeposition `app.js`: direkt **nach** dem Block `var locateControl = L.control.locate(...).addTo(map);`
- Styling: CSS-Klassen `leaflet-bar leaflet-control` (Leaflet-Standard) +
  neue Klasse `leaflet-control-hilfe-btn` in `app.css`
- Klick-Propagation: `L.DomEvent.stopPropagation` verhindert versehentliches
  Klick-Durchreichen auf die Karte

## Einzufügender Code – `assets/js/app.js`

```js
/**************************************************************************************************/
// HELP CONTROL
/**************************************************************************************************/

var HelpControl = L.Control.extend({
  options: {
    position: 'bottomright'
  },
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    var button = L.DomUtil.create('a', 'leaflet-control-hilfe-btn', container);
    button.innerHTML = '?';
    button.href = '#';
    button.title = 'Hilfe';
    L.DomEvent.on(button, 'click', function(e) {
      L.DomEvent.stopPropagation(e);
      e.preventDefault();
      bootstrap.Modal.getOrCreateInstance(document.getElementById('hilfeModalDiv')).show();
    });
    return container;
  }
});

new HelpControl().addTo(map);
```

## Einzufügender Code – `assets/css/app.css`

```css
.leaflet-control-hilfe-btn {
  font-weight: bold;
  font-size: 16px;
}
```

Einfügeposition: nach der bestehenden `#startModalBody img`-Regel (am Ende des
Controls-Bereichs, analog zu US-021-TASK-005).

## Kontext – Einfügstelle `app.js` (nach `locateControl`)

```js
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

// ↓ HelpControl-Block hier einfügen

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
```

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Block `locateControl` mit `.addTo(map)` aufsuchen
- [ ] `HelpControl`-Block direkt **dahinter** einfügen
- [ ] `assets/css/app.css` öffnen
- [ ] CSS-Regel `.leaflet-control-hilfe-btn` ergänzen
- [ ] Im Browser prüfen: `?`-Button erscheint rechts unten, **oberhalb** von Zoom und GPS
- [ ] Klick auf `?` öffnet den modalen Dialog `#hilfeModalDiv`

## Status
Offen

## Aufwand
S

## Abhängigkeit
TASK-001 muss abgeschlossen sein (`#hilfeModalDiv` im DOM vorhanden)
