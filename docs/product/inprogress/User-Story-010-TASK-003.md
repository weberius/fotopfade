# User-Story-010-TASK-003: Bootstrap-3-CSS-Klassen in Inhaltskomponenten migrieren

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
In `index.html` werden veraltete Bootstrap-3-CSS-Klassen in der Sidebar und den Nutzdaten-Bereichen
auf ihre Bootstrap-5-Entsprechungen umgestellt. Modal-Buttons werden in TASK-002 behandelt,
die Navbar-Struktur in TASK-004.

## Technische Details
- Betroffene Datei: `index.html`
- Vollständige Migrations-Tabelle:

  | Bootstrap 3 | Bootstrap 5 | Element / Kontext |
  |---|---|---|
  | `.panel.panel-default` | `.card` | Sidebar `#features` |
  | `.panel-heading` | `.card-header` | Sidebar |
  | `.panel-title` | `.card-title` | Sidebar |
  | `.panel.panel-primary` | `.card` | Inhaltsdivs in Modal-Bodys (`expectModal`, `aboutModal`, `featuresModal`, `linksModal`, `disclaimerModal`, `fImpressumLi`, `fDisclaimerLi`, `fDatenschutzLi`, `fCoffeeLi`, `attributionModalLi`) |
  | `.btn-xs` | `.btn-sm` | `#sidebar-hide-btn` |
  | `.btn-default` | `.btn-secondary` | `#sidebar-hide-btn` |
  | `.pull-right` | `.float-end` | `#sidebar-hide-btn` |
  | `.hidden-xs` | `.d-none.d-sm-inline` | `#list-btn` (Navbar-Listeneintrag) |
  | `.visible-xs` | `.d-inline.d-sm-none` | `.navbar-icon-container > a` |
  | `.tab-pane.fade.active.in` | `.tab-pane.fade.show.active` | `#expectModal` (erste Tab-Pane) |

- Hinweis: `.nav-justified` existiert in Bootstrap 5 unverändert – kein Handlungsbedarf.
- Hinweis: `.panel-primary`-Divs in Modal-Bodys sind reine Inhalts-Wrapper; sie müssen nicht
  zwingend als `card-body` strukturiert werden, da ihr Inhalt dynamisch per `ModalBuilder` gesetzt wird.
  Es genügt, die Klassen zu tauschen.

## Schritte
- [ ] Sidebar `#features`: `<div class="panel panel-default">` → `<div class="card">`,
  `<div class="panel-heading">` → `<div class="card-header">`,
  `<h3 class="panel-title">` → `<h3 class="card-title">`
- [ ] Alle `<div class="panel panel-primary">` in Modal-Bodys → `<div class="card">`
- [ ] `#sidebar-hide-btn`: Klassen `btn btn-xs btn-default pull-right` → `btn btn-sm btn-secondary float-end`
- [ ] `#list-btn` im `<li>`-Tag: Klasse `hidden-xs` → `d-none d-sm-inline`
- [ ] Navbar-Icon-Container-Link: Klasse `visible-xs` → `d-inline d-sm-none`
- [ ] Tab-Pane `#expectModal`: Klassen `active in` → `show active`
- [ ] Seite im Browser laden; Sidebar-Darstellung, Modale Inhalts-Wrapper und Tab-Aktiv-Zustand prüfen

## Ergebnis
Keine Bootstrap-3-exklusiven CSS-Klassen mehr in Sidebar, Inhaltskomponenten und
Sichtbarkeits-Utilities; visuelle Darstellung entspricht dem Ausgangszustand.

## Status
Todo

## Aufwand
S
