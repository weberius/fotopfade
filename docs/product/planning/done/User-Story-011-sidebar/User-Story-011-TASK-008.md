# User-Story-011-TASK-008: `index.html` – list.js CDN-Skript-Tag entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
`list.js` wird in der gesamten App **ausschließlich** in `syncSidebar()` verwendet (`new List("features", ...)`). Da diese Funktion durch TASK-005 entfernt wird, ist die CDN-Einbindung danach eine vollständig ungenutzte Abhängigkeit. Der Skript-Tag muss entfernt werden.

## Technische Details
- Betroffene Datei: `index.html`
- Zeile: 291

## Zu entfernender Skript-Tag

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/1.1.1/list.min.js"></script>
```

## Schritte
- [ ] `index.html` öffnen
- [ ] Den `<script>`-Tag für `list.js` entfernen
- [ ] Prüfen: Kein `new List(...)` oder `featureList` mehr in `app.js` vorhanden (Voraussetzung: TASK-005 abgeschlossen)
- [ ] Prüfen: Browser-Konsole zeigt keinen Fehler wegen fehlender `List`-Klasse

## Reihenfolge
Dieser Task setzt **TASK-005** voraus (Entfernung von `syncSidebar()` mit dem einzigen `new List(...)`-Aufruf).

## Ergebnis
`list.js` ist keine Ladeabhängigkeit mehr; die Anzahl der CDN-Requests beim Seitenaufruf reduziert sich um einen.

## Status
Offen

## Aufwand
XS
