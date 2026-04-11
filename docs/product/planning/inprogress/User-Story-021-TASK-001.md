# User-Story-021-TASK-001: `assets/js/app.js` – Auto-Close `setTimeout` entfernen

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Das `#startModal` schließt sich derzeit automatisch nach 30 Sekunden (zwei `setTimeout`-Aufrufe in den beiden `fetch()`-Blöcken, Zeilen 169–171 und 185–187). Dieses Verhalten widerspricht **ADR-012** (Modale Dialoge schließen sich nur durch explizite Nutzeraktion). Die Aufrufe werden ersatzlos entfernt. Das Modal bleibt ab jetzt offen, bis der Nutzer aktiv handelt.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Betroffene Stellen: zwei identische `setTimeout`-Blöcke (Zeilen ~169–171 und ~185–187)

## Zu entfernender Code (Stelle 1, Zeilen ~169–171)

```js
          // Automatisch nach 30 Sekunden schließen
          setTimeout(function() {
            bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).hide();
          }, 30000);
```

## Zu entfernender Code (Stelle 2, Zeilen ~185–187)

```js
          // Automatisch nach 30 Sekunden schließen
          setTimeout(function() {
            bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).hide();
          }, 30000);
```

Beide Blöcke werden vollständig entfernt. Kein Ersatz erforderlich.

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Ersten `setTimeout`-Block (Zeilen ~169–171) entfernen
- [ ] Zweiten `setTimeout`-Block (Zeilen ~185–187) entfernen
- [ ] Im Browser prüfen: Modal bleibt nach dem Laden unbegrenzt offen

## Status
Offen

## Aufwand
XS
