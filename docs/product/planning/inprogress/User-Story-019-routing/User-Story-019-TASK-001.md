# User-Story-019-TASK-001: `assets/js/config.js` – Namespace aus Hash-Pfad auslesen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
Der `namespace` (z. B. `koeln-muelheim`) bestimmt, welcher Fotopfad geladen wird. Aktuell wird er als Query-Parameter `?id=...` übergeben. Ziel ist Hash-Routing: `index.html#/koeln-muelheim`.

Die Logik zum Auslesen des Namespace aus dem URL soll zentralisiert in `config.js` liegen, da diese Datei als erste Skript-Datei geladen wird und den globalen `namespace` definiert.

## Technische Details
- Betroffene Datei: `assets/js/config.js`
- Hash-Format: `#/koeln-muelheim` → `window.location.hash` liefert `"#/koeln-muelheim"`
- Priorität: Hash-Pfad > Query-Parameter `?id=` (Abwärtskompatibilität) > Default aus `config.start.id`

## Zu ändernder Code

```js
// vorher (Zeile 1)
let namespace = "koeln-muelheim";
```

```js
// nachher
let namespace = (function() {
    // 1. Hash-Routing: index.html#/koeln-muelheim
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
        const seg = hash.slice(2).split('/')[0];
        if (seg) return seg;
    }
    // 2. Abwärtskompatibilität: ?id=koeln-muelheim
    const match = (new RegExp('[?|&]id=([^&;]+?)(&|#|;|$)').exec(location.search));
    if (match && match[1]) return decodeURIComponent(match[1].replace(/\+/g, '%20'));
    // 3. Default
    return "koeln-muelheim";
})();
```

## Hinweis
Durch die Abwärtskompatibilität in Punkt 2 funktionieren bestehende `?id=`-Links weiterhin. TASK-002 ergänzt eine aktive Umleitung (Redirect) für diese Links.

## Schritte
- [ ] `assets/js/config.js` öffnen
- [ ] Zeile 1 (`let namespace = "koeln-muelheim";`) durch den neuen IIFE-Block ersetzen
- [ ] Im Browser prüfen: `index.html#/koeln-muelheim` lädt den Kölner Fotopfad korrekt

## Status
Offen

## Aufwand
S
