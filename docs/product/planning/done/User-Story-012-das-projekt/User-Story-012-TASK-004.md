# User-Story-012-TASK-004: `assets/js/app.js` – `about-btn`-Handler entfernen; 5 neue Click-Handler ergänzen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Den bestehenden Click-Handler für `about-btn` entfernen und durch fünf neue Click-Handler ersetzen – je einen für `geschichte-btn`, `ueber-btn`, `features-btn`, `links-btn` und `resources-btn`. Jeder Handler öffnet das zugehörige eigenständige Modal und schließt das Burger-Menü (analog zu den bestehenden Handlern).

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Zeilen: 15–18

## Zu ersetzender Code

```js
// vorher (Zeilen 15–18)
document.getElementById("about-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("aboutModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});
```

```js
// nachher: fünf eigenständige Handler
document.getElementById("geschichte-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("geschichteModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("ueber-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("ueberModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("features-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("featuresModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("links-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("linksModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});

document.getElementById("resources-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("resourcesModalDiv")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});
```

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Den `about-btn`-Event-Listener (3 Zeilen) entfernen
- [ ] Die fünf neuen Event-Listener an derselben Position einfügen
- [ ] Prüfen: Kein Verweis auf `about-btn` oder `aboutModalDiv` mehr vorhanden
- [ ] Prüfen: Alle fünf neuen Button-IDs werden korrekt referenziert

## Reihenfolge
Dieser Task setzt **TASK-001** (neue Button-IDs in `index.html`) und **TASK-003** (neue Modal-IDs in `index.html`) voraus.

## Ergebnis
Jeder der fünf neuen Burger-Menü-Einträge öffnet seinen zugehörigen modalen Dialog und schließt das Menü.

## Status
Offen

## Aufwand
XS
