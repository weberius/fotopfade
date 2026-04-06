# User-Story-010-TASK-009: Bootstrap-3-Selektoren in app.css migrieren

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
`assets/css/app.css` enthält zwölf Bootstrap-3-spezifische CSS-Selektoren, die nach der
HTML-Klassen-Migration (TASK-003) und dem Navbar-Umbau (TASK-004) ins Leere greifen.
Dieser Task benennt die betroffenen Selektoren auf ihre Bootstrap-5-Entsprechungen um
und entfernt Stile, die sich auf nicht mehr vorhandene HTML-Strukturen beziehen.

## Abhängigkeiten
Setzt TASK-003 und TASK-004 voraus, da die HTML-Klassen dort erst umbenannt werden.

## Technische Details
- Betroffene Datei: `assets/css/app.css`
- Vollständige Migrations-Tabelle (alle grep-Treffer für BS3-Klassen in app.css):

  | Zeile | Bootstrap-3-Selektor | Bootstrap-5-Entsprechung | Aktion |
  |---|---|---|---|
  | 79–100 | `.panel-primary` (6 Regeln) | `.card` | Selektor umbenennen |
  | 123 | `.panel-heading` | `.card-header` | Selektor umbenennen |
  | 126 | `.panel-body` | `.card-body` | Selektor umbenennen |
  | 163 | `.navbar-collapse.in` | `.navbar-collapse.show` | Selektor umbenennen |
  | 166–167 | `.navbar-header .navbar-icon-container` | entfällt (Wrapper in TASK-004 entfernt) | Regel entfernen |
  | 169–171 | `.navbar-header .navbar-icon` | entfällt | Regel entfernen |
  | 173–175 | `.navbar-header a.navbar-icon` | entfällt | Regel entfernen |

- Hinweis: Die Styles aus `.panel-primary` (Margin, Padding, Font-Sizes, img-Breite, Listen)
  beschreiben den Inhaltsbereich der Modal-Bodys. Nach der Umbenennung auf `.card` müssen
  dieselben Regeln unter `.card` weiterhin gelten. Es genügt, den Selektor zu ändern;
  die Eigenschaften bleiben unverändert.
- Hinweis: `.panel-heading` und `.panel-body` legen `width: 250px` fest. Nach der Migration
  zu `.card-header` / `.card-body` gilt dies weiterhin.

## Schritte
- [ ] Alle sechs `.panel-primary`-Regeln umbenennen:
  ```css
  /* alt */
  .panel-primary { … }
  .panel-primary h1 { … }
  .panel-primary h2 { … }
  .panel-primary p { … }
  .panel-primary img { … }
  .panel-primary ul li { … }
  /* neu */
  .card { … }
  .card h1 { … }
  .card h2 { … }
  .card p { … }
  .card img { … }
  .card ul li { … }
  ```
- [ ] `.panel-heading` → `.card-header` umbenennen
- [ ] `.panel-body` → `.card-body` umbenennen
- [ ] `.navbar-collapse.in` → `.navbar-collapse.show` umbenennen:
  ```css
  /* alt */
  .navbar-collapse.in { overflow-y: hidden; }
  /* neu */
  .navbar-collapse.show { overflow-y: hidden; }
  ```
- [ ] Die drei `.navbar-header`-Regeln entfernen (Struktur in TASK-004 aus HTML entfernt):
  ```css
  /* entfernen: */
  .navbar-header .navbar-icon-container { … }
  .navbar-header .navbar-icon { … }
  .navbar-header a.navbar-icon { … }
  ```
- [ ] Seite im Browser laden; visuelle Darstellung von Sidebar, Modals und Navbar prüfen

## Ergebnis
`assets/css/app.css` enthält keine Bootstrap-3-spezifischen Selektoren mehr;
alle Stile greifen korrekt auf die nach TASK-003/TASK-004 umbenannten HTML-Klassen.

## Status
Erledigt

## Aufwand
S
