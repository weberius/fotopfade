# User-Story-021-TASK-003: `assets/js/app.js` – Event-Listener für CTA-Button „Tour starten"

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Der in TASK-002 eingefügte Button `#start-tour-btn` benötigt einen Event-Listener in `app.js`. Ein Klick schließt das Modal und zoomt die Karte auf die gesamte Route (`map.fitBounds(routes.getBounds())`). Damit erhält der Nutzer nach dem Onboarding sofort den optimalen Überblick über die Tour.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Einfügeposition: direkt nach dem `full-extent-btn`-Handler (~Zeile 52), da beide dieselbe `map.fitBounds(routes.getBounds())`-Interaktion mit dem `#startModal` kombinieren. Thematisch und funktional ist das die richtige Nachbarschaft; **nicht** im Footer-Handler-Block (~Zeile 565), der ausschließlich Link-Navigation betrifft.
- Abhängigkeit: `routes` (L.geoJson-Instanz) und `map` sind zu diesem Zeitpunkt bereits deklariert

## Einzufügender Code

```js
document.getElementById("start-tour-btn").addEventListener("click", function() {
  if (routes.getBounds().isValid()) {
    map.fitBounds(routes.getBounds());
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).hide();
});
```

## Hinweis
Die `isValid()`-Prüfung schützt vor einem Fehler bei noch nicht geladener Route-Geometrie (sollte im Normalbetrieb nicht auftreten, da das Modal erst nach erfolgreichem Laden der Route angezeigt wird).

## Schritte
- [x] `assets/js/app.js` öffnen
- [x] `full-extent-btn`-Handler (~Zeile 47) aufsuchen
- [x] Event-Listener für `start-tour-btn` direkt darunter (nach Zeile ~52) einfügen
- [ ] Im Browser prüfen: Klick auf „Tour starten“ schließt Modal und zoomt auf gesamte Route

## Status
Erledigt

## Aufwand
XS

## Abhängigkeit
TASK-002 muss abgeschlossen sein (Button im DOM vorhanden)
