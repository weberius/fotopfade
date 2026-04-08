# User-Story-020-TASK-002: `assets/js/app.js` – Event-Listener auf neue Button-ID umstellen

## Zugehörige Story
User-Story-020 – Rechtssicherheit & Unterstützung

## Beschreibung
Der Event-Listener für den Coffee-Button referenziert die ID `footer-coffee-btn`. Nach TASK-001 heißt die neue ID `nav-coffee-btn`. Der Listener muss auf die neue ID umgestellt werden.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Betroffene Zeilen: ~580–583

## Zu ändernder Code

```js
// vorher (Footer-Pattern: e.preventDefault())
document.getElementById("footer-coffee-btn").addEventListener("click", function(e) {
  e.preventDefault();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("fCoffeeModal")).show();
});
```

```js
// nachher (Navbar-Pattern: return false + Collapse schließen)
document.getElementById("nav-coffee-btn").addEventListener("click", function() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById("fCoffeeModal")).show();
  bootstrap.Collapse.getOrCreateInstance(document.querySelector(".navbar-collapse")).hide();
  return false;
});
```

**Hinweis zum Pattern:** Alle anderen Navbar-Button-Listener (`ueber-btn`, `geschichte-btn`, …) verwenden `return false` statt `e.preventDefault()` und rufen explizit `.hide()` auf dem Collapse auf. Obwohl `data-bs-toggle="collapse"` das Schließen der Navbar bereits übernimmt, wird das bestehende Muster hier eingehalten.

## Schritte
- [ ] `assets/js/app.js` öffnen
- [ ] Gesamten Listener-Block für `footer-coffee-btn` durch den neuen Block für `nav-coffee-btn` ersetzen
- [ ] Im Browser prüfen: Klick auf Navbar-Eintrag „Unterstützung" öffnet `#fCoffeeModal` und schließt das Menü
- [ ] Browser-Konsole: kein `Cannot read properties of null` Fehler

## Status
Offen

## Aufwand
XS

## Abhängigkeit
Setzt TASK-001 voraus.
