# User-Story-014-TASK-002: `index.html` – Bootstrap-Klasse `text-primary` vom POI-Modal-Titel entfernen

## Zugehörige Story
User-Story-014 – Einheitliches Erscheinungsbild der Benutzeroberfläche

## Beschreibung
Das `<h4>`-Element des POI-Detailmodals trägt die Bootstrap-Klasse `text-primary`, die den Titel blau einfärbt. Diese Klasse ist zu entfernen, damit der Titel wie alle anderen Modal-Titel in Schwarz erscheint.

## Technische Details
- Betroffene Datei: `index.html`
- Betroffenes Element: `<h4 class="modal-title text-primary" id="feature-title">`
- Modal-ID: `featureModal`

## Zu änderndes Markup

```html
<!-- vorher -->
<h4 class="modal-title text-primary" id="feature-title"></h4>
```

```html
<!-- nachher -->
<h4 class="modal-title" id="feature-title"></h4>
```

## Schritte
- [x] `index.html` öffnen
- [x] Klasse `text-primary` aus dem `<h4>`-Element mit `id="feature-title"` entfernen
- [x] Prüfen: POI-Marker anklicken – Modal-Titel wird schwarz dargestellt

## Ergebnis
Der Titel im POI-Detailmodal erscheint schwarz, identisch mit dem „Features"-Dialog als Referenz.

## Status
Erledigt

## Aufwand
XS
