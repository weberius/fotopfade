# User-Story-019-TASK-004: `assets/js/app.js` – `URLParameter`-Klasse auf `namespace` umstellen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
Die Klasse `URLParameter` im Download-Bereich von `app.js` (ab Zeile ~467) ermittelt die ID eigenständig über `getURLParameter("id")`. Nach Umstieg auf Hash-Routing liefert dieser Aufruf stets `null`. Die Klasse soll stattdessen die globale Variable `namespace` verwenden.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Betroffene Zeilen: ~472–476 (Konstruktor der Klasse `URLParameter`)

## Zu ändernder Code

```js
// vorher
constructor() {
    if (getURLParameter("id")) {
        this.id = getURLParameter("id");
    } else {
        this.id = config.start.id;
    }
}
```

```js
// nachher
constructor() {
    this.id = namespace;
}
```

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Konstruktor der Klasse `URLParameter` anpassen
- [ ] Prüfen: Download-Funktion erzeugt URLs mit dem korrekten Namespace

## Status
Offen

## Aufwand
XS
