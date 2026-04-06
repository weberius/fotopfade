# User-Story-012-TASK-001: `index.html` – `about-btn`-Eintrag durch 5 neue Menü-Einträge ersetzen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Den einzelnen Menüpunkt „Das Projekt" (`about-btn`) in der Navbar durch fünf eigenständige `<li>`-Einträge ersetzen: Geschichte, Über das Projekt, Features, QR-Code und Quellen.

## Technische Details
- Betroffene Datei: `index.html`
- Zeile: 72

## Zu ersetzendes Markup

```html
<!-- vorher: ein einziger Eintrag -->
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="about-btn"><i class="bi bi-question-circle"></i>&nbsp;&nbsp;<span id="aboutSelectorSpan">About</span></a></li>
```

```html
<!-- nachher: fünf eigenständige Einträge -->
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="geschichte-btn"><i class="bi bi-person-check"></i>&nbsp;<span id="geschichteSelectorSpan">Geschichte</span></a></li>
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="ueber-btn"><i class="bi bi-question-circle"></i>&nbsp;<span id="ueberSelectorSpan">Über das Projekt</span></a></li>
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="features-btn"><i class="bi bi-ui-checks"></i>&nbsp;<span id="featuresSelectorSpan">Features</span></a></li>
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="links-btn"><i class="bi bi-bookmark-star"></i>&nbsp;<span id="linksSelectorSpan">QR-Code</span></a></li>
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="resources-btn"><i class="bi bi-exclamation-circle"></i>&nbsp;<span id="resourcesSelectorSpan">Quellen</span></a></li>
```

### Neue IDs im Überblick

| Element          | Button-ID        | Span-ID                   |
|------------------|------------------|---------------------------|
| Geschichte       | `geschichte-btn` | `geschichteSelectorSpan`  |
| Über das Projekt | `ueber-btn`      | `ueberSelectorSpan`       |
| Features         | `features-btn`   | `featuresSelectorSpan`    |
| QR-Code          | `links-btn`      | `linksSelectorSpan`       |
| Quellen          | `resources-btn`  | `resourcesSelectorSpan`   |

## Schritte
- [ ] `index.html` öffnen
- [ ] Das `<li>`-Element mit `id="about-btn"` durch die fünf neuen `<li>`-Elemente ersetzen
- [ ] Prüfen: Die Navbar enthält keinen Eintrag `about-btn` mehr
- [ ] Prüfen: Fünf neue `<li>`-Einträge sind in der richtigen Reihenfolge vorhanden

## Reihenfolge
Dieser Task muss **vor TASK-004** ausgeführt werden: In TASK-004 werden die Click-Handler für die neuen Button-IDs ergänzt.

## Ergebnis
Das Burger-Menü zeigt fünf eigenständige Einträge für die Projektinhalte statt des bisherigen einzelnen „Das Projekt"-Eintrags.

## Status
Offen

## Aufwand
XS
