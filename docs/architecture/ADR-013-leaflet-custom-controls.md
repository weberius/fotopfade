# ADR-013: Leaflet Custom Controls als Einstiegspunkte in modale Dialoge

**Datum:** 2026-04  
**Status:** Akzeptiert  
**Umgesetzt in:** User-Story-022

---

## Kontext

Mit User-Story-022 wurde ein Hilfe-Button (`?`) auf der Karte eingeführt, der beim Klick
einen modalen Dialog öffnet. Für diesen Anwendungsfall waren zwei grundlegende Designfragen
zu entscheiden:

1. **Wo wird der Button platziert?** – Im Burger-Menü (Navbar) oder direkt auf der Karte.
2. **Wie wird ein Leaflet-Control implementiert**, das eine Bootstrap-Modal-Interaktion auslöst?

Die Navbar wird in der App für inhaltliche Einstiegspunkte genutzt (Geschichte, Über,
Features, …). Ein Hilfe-Button gehört funktional zur Kartenansicht – er hilft beim
Bedienen der Karte – und soll deshalb räumlich dort positioniert sein, wo der Nutzer
ihn benötigt: direkt auf der Karte.

## Entscheidung

Kartenbezogene Aktionsbuttons, die einen modalen Dialog öffnen, werden als
**benutzerdefinierte Leaflet-Controls** via `L.Control.extend()` realisiert.
Sie erscheinen nicht im Burger-Menü.

### Regeln für Custom Controls dieser Art

#### Implementierung

```js
var MyControl = L.Control.extend({
  options: { position: 'bottomright' },
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    var button = L.DomUtil.create('a', 'leaflet-control-<name>-btn', container);
    button.href = '#';
    button.innerHTML = '…';
    L.DomEvent.on(button, 'click', function(e) {
      L.DomEvent.stopPropagation(e);
      e.preventDefault();
      bootstrap.Modal.getOrCreateInstance(document.getElementById('<modalId>')).show();
    });
    return container;
  }
});
new MyControl().addTo(map);
```

#### Stapelreihenfolge `bottomright`

Leaflet platziert Controls an unteren Ecken mit `insertBefore(el, corner.firstChild)` –
jeder neue Control-Container wird **vor** dem bisherigen ersten Kind eingefügt und erscheint
damit **visuell höher** (weiter vom unteren Kartenrand entfernt). Das **zuletzt**
via `.addTo(map)` hinzugefügte Control ist das **oberste**.

Damit ein neues Control **oberhalb** von Zoom und GPS erscheint, muss es **nach**
`zoomControl` und `locateControl` zur Karte hinzugefügt werden.

#### Styling

Die CSS-Klasse `leaflet-bar` des Leaflet-Standards liefert bereits:
Breite, Höhe, `line-height`, `display: block`, `text-align`, Textdekoration,
Farbe und Hintergrund des `<a>`-Elements.

Additive Änderungen (z. B. Schriftgröße, Schriftstärke) dürfen **nicht als
Inline-Styles** in `app.js` gesetzt werden, sondern gehören als CSS-Regel in
`assets/css/app.css`. Die Button-CSS-Klasse folgt dem Namensschema
`.leaflet-control-<name>-btn`.

#### Klick-Propagation

`L.DomEvent.stopPropagation(e)` und `e.preventDefault()` sind in jedem
Custom-Control-Click-Handler Pflicht, um versehentliche Karteninteraktionen zu verhindern.

#### Kein Navbar-Eintrag

Kartenbezogene Controls, die als `L.Control.extend()` realisiert sind, erhalten
keinen parallelen Eintrag im Burger-Menü. Die Navbar bleibt inhaltlichen
Einstiegspunkten vorbehalten.

## Alternativen

| Alternative | Bewertung |
|---|---|
| Navbar-Eintrag | Räumlich falsch: Hilfe zur Karte gehört auf die Karte; Navbar wächst weiter |
| Floating-Button via CSS-Position (`position: fixed`) | Nicht in Leaflets Control-Stapel integriert; Überschneidungen mit anderen Controls schwer vermeidbar |
| Eigenständige HTML-Seite / Tooltip | Widerspricht dem SPA-Ansatz (ADR-001); Tooltip-Modell ungeeignet für mehrere Zeilen Text |
| Bootstrap-Offcanvas statt Modal | Inkonsistent mit den bestehenden modalen Dialogen (ADR-010); Offcanvas-Pattern bisher nicht im Projekt verwendet |

## Konsequenzen

**Positiv:**
- Kontextuelle Platzierung: der Button erscheint dort, wo er gebraucht wird
- Nahtlose Integration in Leaflets Control-Stack (Positionierung, z-index, Touch-Handling)
- Einheitliche Interaktion mit Bootstrap-Modals wie alle anderen Dialoge
- Keine Navbar-Verlängerung
- CSS in `app.css` bleibt die einzige Quelle für Styling-Entscheidungen

**Negativ:**
- Leaflet-Control-API ist low-level; Entwickler müssen `insertBefore`-Stapelverhalten kennen
- Controls auf der Karte sind auf mobilen Geräten bei kleiner Kartenfläche platzintensiv

## Beziehung zu anderen ADRs

| ADR | Beziehung |
|---|---|
| ADR-001 | Kein Widerspruch; rein clientseitige, statische Lösung |
| ADR-002 | Setzt Leaflet-Extension-API (`L.Control.extend`) ein |
| ADR-004 | Modal-Titel und Schliessen-Button werden via i18next lokalisiert |
| ADR-005 | Modal-Inhalt wird als Markdown-Datei per `ModalBuilder.loadMarkdown()` bereitgestellt |
| ADR-010 | Das neue Control öffnet einen eigenständigen modalen Dialog – konsistent mit dem Muster eigenständiger Projekt-Dialoge |
| ADR-012 | Der modale Dialog schließt sich ausschließlich durch explizite Nutzeraktion |
