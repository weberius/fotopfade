# User-Story-019-TASK-002: `assets/js/app.js` – Redundante `?id=`-Namespace-Abfrage entfernen und Redirect ergänzen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
In `app.js` wird der `namespace` nach dem Laden von `config.js` ein zweites Mal aus `?id=` überschrieben. Da TASK-001 das Auslesen des Namespace bereits vollständig in `config.js` zentralisiert hat, ist dieser Block in `app.js` überflüssig und zu entfernen.

Zusätzlich wird am Anfang von `app.js` ein Redirect ergänzt: Wenn ein Nutzer eine URL mit `?id=name` aufruft, wird er transparent auf die entsprechende Hash-URL (`#/name`) weitergeleitet.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Betroffene Zeilen: 4–8 (namespace-Überschreibung) und Einfügeposition am Anfang der Datei

## Zu entfernender Code (Zeilen 4–8)

```js
// get namespace from urlParameter
if (getURLParameter("id")) {
  namespace = getURLParameter("id");
} else {
  namespace = config.start.id;
}
```

## Einzufügender Redirect-Block (ganz am Anfang von app.js, vor allem anderen)

```js
// Abwärtskompatibilität: ?id=name → #/name
(function() {
    const match = (new RegExp('[?|&]id=([^&;]+?)(&|#|;|$)').exec(location.search));
    if (match && match[1]) {
        const id = decodeURIComponent(match[1].replace(/\+/g, '%20'));
        window.location.replace(window.location.pathname + '#/' + id);
    }
})();
```

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Redirect-Block ganz am Anfang der Datei einfügen
- [ ] Block in Zeilen 4–8 (namespace-Überschreibung aus `?id=`) entfernen
- [ ] Prüfen: Aufruf von `index.html?id=koeln-muelheim` leitet auf `index.html#/koeln-muelheim` weiter
- [ ] Prüfen: Namespace ist nach dem Redirect korrekt gesetzt

## Status
Offen

## Aufwand
S
