# User-Story-019-TASK-001: `assets/js/config.js` – Namespace aus Hash-Pfad auslesen

## Zugehörige Story
User-Story-019 – Pfad-basiertes Routing (Clean URLs)

## Beschreibung
Der `namespace` (z. B. `koeln-muelheim`) bestimmt, welcher Fotopfad geladen wird. Aktuell wird er als Query-Parameter `?id=...` übergeben. Ziel ist Hash-Routing: `index.html#/koeln-muelheim`.

Die Logik zum Auslesen des Namespace aus dem URL soll zentralisiert in `config.js` liegen, da diese Datei als erste Skript-Datei geladen wird und den globalen `namespace` definiert.

## Technische Details
- Betroffene Datei: `assets/js/config.js`
- Hash-Format: `#/koeln-muelheim` → `window.location.hash` liefert `"#/koeln-muelheim"`
- Priorität: Hash-Pfad > Query-Parameter `?id=` (Abwärtskompatibilität) > Hardcoded Default in Zeile 1
- Hinweis: Ein `config`-Objekt existiert **nicht** (ADR-003). Der Default-Namespace ist der bisherige Literalwert in Zeile 1.

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
    // 2. Sicherheitsnetz für den ersten Lade-Zyklus mit ?id= (vor dem Redirect aus TASK-002)
    const match = (new RegExp('[?|&]id=([^&;]+?)(&|#|;|$)').exec(location.search));
    if (match && match[1]) return decodeURIComponent(match[1].replace(/\+/g, '%20'));
    // 3. Default-Namespace (entspricht dem bisherigen Literalwert in Zeile 1)
    return "koeln-muelheim";
})();
```

## Hinweis
**Warum `?id=`-Sicherheitsnetz in config.js (Punkt 2)?**  
TASK-002 ergänzt in `app.js` einen Redirect `?id=` → `#/`. Da `window.location.replace()` JavaScript **nicht synchron stoppt**, durchläuft `app.js` nach dem Redirect-Aufruf noch vollständig seine Initialisierung. Damit die Karte und Daten in diesem ersten (sofort abbrechenden) Ladevorgang trotzdem mit dem richtigen Namespace laufen, liest der IIFE den `?id=`-Wert als Fallback. Nach dem Redirect-Neustart greift ausschließlich Punkt 1 (Hash).

## Schritte
- [x] `assets/js/config.js` öffnen
- [x] Zeile 1 (`let namespace = "koeln-muelheim";`) durch den neuen IIFE-Block ersetzen
- [x] Im Browser prüfen: `index.html#/koeln-muelheim` lädt den Kölner Fotopfad korrekt

## Status
Erledigt

## Aufwand
S
