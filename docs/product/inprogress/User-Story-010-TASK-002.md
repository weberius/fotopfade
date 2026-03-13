# User-Story-010-TASK-002: Bootstrap-3-HTML-Attribute migrieren

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
In `index.html` werden alle Bootstrap-3-spezifischen HTML-Attribute (`data-toggle`, `data-target`, `data-dismiss`) durch die Bootstrap-5-Varianten (`data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`) ersetzt. Außerdem werden die Bootstrap-3-close-Buttons durch Bootstrap-5-kompatible `<button class="btn-close">` ersetzt.

## Technische Details
- Betroffene Datei: `index.html`
- Bootstrap 5 hat alle `data-*`-Attribute mit dem Präfix `data-bs-*` versehen.
- Betrifft: Navbar-Links (collapse), Dropdown-Toggle, Modal-Dismiss-Buttons
- Bootstrap-3-Close-Button: `<button class="close" data-dismiss="modal">×</button>`  
  → Bootstrap-5: `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
- Der `<h4 class="modal-title">` muss in die neue Bootstrap-5-Modal-Header-Struktur eingebettet werden (kein fixes Order-Verhältnis mehr nötig, aber `btn-close` wird nach dem Title-Heading platziert).

## Schritte
- [ ] Alle `data-toggle="collapse"` → `data-bs-toggle="collapse"` ersetzen (5 Stellen in Navbar-Links)
- [ ] Alle `data-toggle="dropdown"` → `data-bs-toggle="dropdown"` ersetzen (1 Stelle: Sprach-Dropdown)
- [ ] Alle `data-target=".navbar-collapse.in"` → `data-bs-target=".navbar-collapse"` ersetzen (Hinweis: BS5 nutzt nicht mehr `.in` als Toggle-Klasse)
- [ ] Alle `data-dismiss="modal"` → `data-bs-dismiss="modal"` ersetzen (in allen Modals)
- [ ] Alle alten Close-Buttons ersetzen:
  ```html
  <!-- alt -->
  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
  <!-- neu -->
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schliessen"></button>
  ```
  Betroffene Modals: `startModal`, `aboutModalDiv`, `legendModal`, `featureModal`, `attributionModal`,
  `fImpressumModal`, `fDisclaimerModal`, `fDatenschutzModal`, `fCoffeeModal`
- [ ] Seite im Browser laden und alle Modals auf korrekte Schliessen-Funktionalität testen

## Ergebnis
Keine `data-toggle`, `data-target` oder `data-dismiss`-Attribute mehr im HTML; alle Bootstrap-Interaktionen
nutzen `data-bs-*`-Attribute.

## Status
Todo

## Aufwand
S
