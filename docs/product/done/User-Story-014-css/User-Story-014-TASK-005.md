# User-Story-014-TASK-005: `assets/js/locale.js` – i18n-Zuweisung für `attributionModalTitle` ergänzen

## Zugehörige Story
User-Story-014 – Einheitliches Erscheinungsbild der Benutzeroberfläche

## Beschreibung
Die Funktion `updateContent()` in `locale.js` befüllt beim Laden und bei jedem Sprachwechsel alle Titel-Elemente per `i18next.t()`. Der in TASK-004 neu eingeführte Span `attributionModalTitle` ist dort noch nicht berücksichtigt.

## Technische Details
- Betroffene Datei: `assets/js/locale.js`
- Einfügeposition: unmittelbar nach der Zeile für `resourcesModalTitle`

## Zu ändernder Code

```js
// vorher
document.getElementById('resourcesModalTitle').innerHTML = i18next.t('resourcesTitle');
```

```js
// nachher
document.getElementById('resourcesModalTitle').innerHTML = i18next.t('resourcesTitle');
document.getElementById('attributionModalTitle').innerHTML = i18next.t('attributionTitle');
```

## Reihenfolge
Dieser Task setzt TASK-004 (HTML-Element vorhanden) und TASK-006 (i18n-Schlüssel vorhanden) voraus.

## Schritte
- [x] `assets/js/locale.js` öffnen
- [x] Neue Zeile nach dem `resourcesModalTitle`-Eintrag einfügen
- [x] Prüfen: Attribution-Dialog in verschiedenen Sprachen öffnen – Titel wird korrekt gesetzt

## Ergebnis
`i18next.t('attributionTitle')` wird bei jedem Sprachwechsel in den Attribution-Dialog-Titel geschrieben.

## Status
Erledigt

## Aufwand
XS
