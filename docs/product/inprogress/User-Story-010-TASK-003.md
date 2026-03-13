# User-Story-010-TASK-003: Bootstrap-3-CSS-Klassen in index.html migrieren

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
In `index.html` werden alle Bootstrap-3-spezifischen CSS-Klassen auf ihre Bootstrap-5-Entsprechungen migriert.
Betroffen sind Paneel-, Modal-Header-, Button- und Sichtbarkeitsklassen.

## Technische Details
- Betroffene Datei: `index.html`
- Vollständige Migrations-Tabelle für die vorhandenen Klassen:

  | Bootstrap 3 | Bootstrap 5 | Stellen |
  |---|---|---|
  | `.panel.panel-default` | `.card` | Sidebar (`#features`) |
  | `.panel.panel-primary` | `.card` | Modal-Inhalts-Divs |
  | `.panel-heading` | `.card-header` | Sidebar |
  | `.panel-title` | `.card-title` oder `<h5>` | Sidebar |
  | `.btn-default` | `.btn-secondary` | alle Schliessen-Buttons |
  | `.btn-xs` | `.btn-sm` | `#sidebar-hide-btn` |
  | `.pull-right` | `.float-end` | `#sidebar-hide-btn` |
  | `.hidden-xs` | `.d-none .d-sm-inline` | `#list-btn` in Navbar |
  | `.visible-xs` | `.d-inline .d-sm-none` | `.navbar-icon-container > a` |
  | `.tab-pane.fade.active.in` | `.tab-pane.fade.show.active` | `#expectModal` (erste Tab) |
  | `.nav-justified` | `.nav-fill` oder `.nav-justified` (BS5 hat `nav-justified`) | `#aboutTabsHeader` |

- Hinweis: Alle `btn-default`-Schliessen-Buttons entfallen, wenn TASK-002 den `btn-close`-Button einführt.
  Für andere Buttons (z. B. `closeBtnLegendModal` Span) werden die Buttons auf `.btn-secondary` umgestellt.

## Schritte
- [ ] `.panel.panel-default` → `<div class="card">` inkl. `.panel-heading` → `.card-header` und `.panel-title` → `.card-title` (Sidebar `#features`)
- [ ] `.panel.panel-primary` → `<div class="card card-body">` in allen Inhalt-Modals (aboutModalDiv-Tabs, fImpressumModal, fDisclaimerModal, fDatenschutzModal, fCoffeeModal, attributionModal)
- [ ] Alle `<button class="btn btn-default" data-bs-dismiss="modal">` → `<button class="btn btn-secondary" data-bs-dismiss="modal">`
- [ ] `.btn-xs` entfernen oder durch `.btn-sm` ersetzen (`#sidebar-hide-btn`)
- [ ] `.pull-right` → `.float-end` (`#sidebar-hide-btn`)
- [ ] `.hidden-xs` → `.d-none .d-sm-inline` (`#list-btn`)
- [ ] `.visible-xs` → `.d-inline .d-sm-none` (Navbar-Hamburger-Link-Container)
- [ ] Erste `.tab-pane` Klassen prüfen: `active in` → `show active`
- [ ] Seite im Browser laden; visuelle Darstellung der Sidebar, Modals und Tabs prüfen

## Ergebnis
Keine Bootstrap-3-exklusiven CSS-Klassen mehr in `index.html`; Layout und Darstellung entsprechen dem
vorherigen Stand.

## Status
Todo

## Aufwand
M
