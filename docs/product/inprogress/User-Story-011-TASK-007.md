# User-Story-011-TASK-007: `assets/js/locale.js` – `poisSelectorSpan` und `poisPanelTitle` aus `updateContent()` entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
In `updateContent()` werden die i18n-Übersetzung für den Menüpunkt (`poisSelectorSpan`) und den Sidebar-Paneltitel (`poisPanelTitle`) gesetzt. Da beide DOM-Elemente durch TASK-001 und TASK-002 entfernt wurden, müssen auch diese Zeilen entfernt werden.

## Technische Details
- Betroffene Datei: `assets/js/locale.js`
- Zeilen: 52–53

## Zu entfernende Zeilen

```js
document.getElementById('poisSelectorSpan').innerHTML = i18next.t('pois');
document.getElementById('poisPanelTitle').innerHTML = i18next.t('pois');
```

## Schritte
- [ ] `assets/js/locale.js` öffnen
- [ ] Beide Zeilen in `updateContent()` entfernen
- [ ] Prüfen: Keine Referenz auf `poisSelectorSpan` oder `poisPanelTitle` mehr in `locale.js`
- [ ] Prüfen: Browser-Konsole zeigt keinen Fehler wegen fehlendem DOM-Element

## Ergebnis
`updateContent()` referenziert keine Sidebar-DOM-Elemente mehr.

## Status
Offen

## Aufwand
XS
