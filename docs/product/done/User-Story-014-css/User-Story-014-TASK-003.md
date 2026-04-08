# User-Story-014-TASK-003: `assets/css/app.css` – Rahmen (Border) der `.card`-Elemente in Modals entfernen

## Zugehörige Story
User-Story-014 – Einheitliches Erscheinungsbild der Benutzeroberfläche

## Beschreibung
Die modalen Dialoge Geschichte, Über das Projekt, Features, QR-Code, Quellen und Attribution laden ihren Inhalt in ein `<div class="card">`. Bootstraps `.card`-Klasse setzt standardmäßig eine sichtbare Border. Der „Start"-Dialog verwendet kein `.card` und dient als Referenz für das rahmenlose Erscheinungsbild.

Betroffene Card-IDs: `expectModalLi`, `aboutModalLi`, `featuresModalLi`, `linksModalLi`, `resourcesModalLi`, `attributionModalLi`.

## Technische Details
- Betroffene Datei: `assets/css/app.css`
- Betroffene Regel: `.card { margin: 10px; padding: 10px; }`

## Zu ändernde CSS-Regel

```css
/* vorher */
.card {
    margin: 10px;
    padding: 10px;
}
```

```css
/* nachher */
.card {
    margin: 10px;
    padding: 10px;
    border: none;
}
```

## Schritte
- [x] `assets/css/app.css` öffnen
- [x] `border: none;` zur bestehenden `.card`-Regel ergänzen
- [x] Prüfen: Geschichte, Über das Projekt, Features, QR-Code, Quellen und Attribution öffnen – kein Rahmen sichtbar

## Ergebnis
Alle sechs betroffenen Dialoge zeigen keinen sichtbaren Rahmen um den Textinhalt, identisch mit dem „Start"-Dialog als Referenz.

## Status
Erledigt

## Aufwand
XS
