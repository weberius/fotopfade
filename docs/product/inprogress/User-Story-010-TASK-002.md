# User-Story-010-TASK-002: Modal-Buttons vollständig auf Bootstrap 5 migrieren

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
In `index.html` werden alle Bootstrap-3-spezifischen Attribute und CSS-Klassen der Modal-Buttons
vollständig auf Bootstrap 5 umgestellt. Das betrifft ausschließlich Elemente innerhalb von Modals –
Navbar-Elemente werden in TASK-004 behandelt.

## Technische Details
- Betroffene Datei: `index.html`, ausschließlich Elemente innerhalb von `<div class="modal ...">`.
- Zwei Arten von Modal-Buttons mit je zwei notwendigen Änderungen:

  | Button-Typ | BS3 | BS5 |
  |---|---|---|
  | Header-X-Button Klasse | `class="close"` | `class="btn-close"` |
  | Header-X-Button Inhalt | `aria-hidden="true">&times;</button>` | `aria-label="Schliessen"></button>` |
  | Header-X-Button Attribut | `data-dismiss="modal"` | `data-bs-dismiss="modal"` |
  | Footer-Button Klasse | `class="btn btn-default"` | `class="btn btn-secondary"` |
  | Footer-Button Attribut | `data-dismiss="modal"` | `data-bs-dismiss="modal"` |

- Betroffene Modals: `startModal`, `aboutModalDiv`, `legendModal`, `featureModal`, `attributionModal`,
  `fImpressumModal`, `fDisclaimerModal`, `fDatenschutzModal`, `fCoffeeModal`

## Schritte
- [ ] Header-X-Buttons in allen Modals ersetzen:
  ```html
  <!-- alt -->
  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
  <!-- neu -->
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schliessen"></button>
  ```
- [ ] Footer-Schliessen-Buttons in allen Modals ersetzen:
  ```html
  <!-- alt -->
  <button type="button" class="btn btn-default" data-dismiss="modal">
  <!-- neu -->
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
  ```
- [ ] Prüfen, dass kein `data-dismiss` und kein `class="close"` mehr im HTML vorkommt
- [ ] Alle Modals im Browser auf korrekte Schliessen-Funktionalität (X und Schliessen-Button) testen

## Ergebnis
Alle Modal-Buttons verwenden `data-bs-dismiss` und die korrekten Bootstrap-5-Klassen; kein
`data-dismiss`, `class="close"` oder `btn-default` mehr innerhalb von Modals.

## Status
Todo

## Aufwand
S
