# User-Story-019-TASK-003: `assets/js/app.js` – Alle direkten `getURLParameter("id")`-Aufrufe durch `namespace` ersetzen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
In `app.js` gibt es zwei Stellen, die `getURLParameter("id")` direkt zur Laufzeit aufrufen statt die globale Variable `namespace` zu verwenden. Nach Umstieg auf Hash-Routing gibt `getURLParameter("id")` immer `null` zurück, da der Namespace nicht mehr als Query-Parameter übergeben wird. Beide Stellen müssen auf `namespace` umgestellt werden.

Hinweis: Die Namespace-Auflösung beim App-Start (Zeilen 4–8) ist Gegenstand von TASK-002.

## Technische Details
- Betroffene Datei: `assets/js/app.js`

### Stelle 1 – `legend-btn`-Click-Handler (Zeilen ~60–62)

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

### Stelle 2 – Konstruktor der Klasse `URLParameter` (Zeilen ~472–476)

```js
// vorher
constructor() {
    if (getURLParameter("id")) {
        this.id = getURLParameter("id");
    } else {
        this.id = config.start.id; // BUG: config-Objekt existiert nicht (ADR-003)
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
- [ ] Stelle 1: Ternäre Konstruktion in der `legend-btn`-Funktion durch `var urldata = "service/data/" + namespace + ".json";` ersetzen
- [ ] Stelle 2: Konstruktor der Klasse `URLParameter` durch `this.id = namespace;` ersetzen
- [ ] Prüfen: Klick auf „Route" öffnet die Datentabelle mit den korrekten Daten des aktiven Fotopfads
- [ ] Prüfen: Download-Funktion erzeugt URLs mit dem korrekten Namespace
- [ ] Prüfen: `getURLParameter("id")` kommt in `app.js` nicht mehr vor (außer in der Methode `URLParameter.getURLParameter()`, die jedoch nach dieser Änderung totes Code-Segment ist und entfernt werden kann)

## Status
Offen

## Aufwand
S
