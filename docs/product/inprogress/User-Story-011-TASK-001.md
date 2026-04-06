# User-Story-011-TASK-001: `index.html` – Navbar-Listeneintrag `list-btn` entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Den Menüpunkt "Sehenswürdigkeiten" aus der Navbar entfernen. Es handelt sich um das `<li>`-Element mit `id="list-btn"` in Zeile 72 von `index.html`.

## Technische Details
- Betroffene Datei: `index.html`
- Zeile: 72

## Zu entfernendes Markup

```html
<li class="d-none d-sm-block"><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="list-btn"><i class="bi bi-layout-text-sidebar"></i>&nbsp;&nbsp;<span id="poisSelectorSpan">POIs</span></a></li>
```

## Schritte
- [ ] `index.html` öffnen
- [ ] Das `<li>`-Element mit `id="list-btn"` (einschließlich des enthaltenen `<a>`-Tags und `<span id="poisSelectorSpan">`) vollständig entfernen
- [ ] Prüfen: Die Navbar enthält keinen Eintrag mehr für die Sidebar / Sehenswürdigkeiten

## Ergebnis
Das Burger-Menü enthält keinen Menüpunkt "Sehenswürdigkeiten" mehr.

## Status
Offen

## Aufwand
XS
