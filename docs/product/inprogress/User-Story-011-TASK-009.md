# User-Story-011-TASK-009: `index.html` – Handlebars.js CDN-Skript-Tag entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Handlebars.js (v3.0.3) ist in `index.html` als CDN-Abhängigkeit eingebunden, wird jedoch **nirgendwo** in `app.js` oder `locale.js` verwendet. Es handelt sich um toten Ballast ohne Funktion. Dieser Task entfernt den Skript-Tag.

## Technische Details
- Betroffene Datei: `index.html`
- Zeile: 290

## Zu entfernender Skript-Tag

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.min.js"></script>
```

## Schritte
- [ ] Sicherstellen: `grep -rn "Handlebars\|handlebars" assets/js/` liefert kein Ergebnis
- [ ] `index.html` öffnen
- [ ] Den `<script>`-Tag für `handlebars.min.js` entfernen
- [ ] Prüfen: Browser-Konsole zeigt keinen Fehler wegen fehlender `Handlebars`-Klasse

## Reihenfolge
Unabhängig von allen anderen Tasks dieser Story. Kann isoliert durchgeführt werden.

## Ergebnis
Handlebars.js wird nicht mehr geladen; die Anzahl der CDN-Requests beim Seitenaufruf reduziert sich um einen.

## Status
Offen

## Aufwand
XS
