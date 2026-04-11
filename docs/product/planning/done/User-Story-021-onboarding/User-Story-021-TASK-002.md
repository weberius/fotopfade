# User-Story-021-TASK-002: `index.html` – CTA-Button „Tour starten" im `#startModal`-Footer ergänzen

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Im Footer des `#startModal` gibt es bisher nur einen sekundären „Schliessen"-Button. Es wird ein primärer CTA-Button „Tour starten" vorangestellt, der den Nutzer aktiv einlädt, die Tour zu beginnen. Der bestehende „Schliessen"-Button bleibt als sekundäre Aktion erhalten.

## Technische Details
- Betroffene Datei: `index.html`
- Betroffene Stelle: `<div class="modal-footer">` innerhalb von `#startModal` (Zeile ~45)
- Neuer Button: `btn-primary`, ID `start-tour-btn`, Label über i18n via `<span id="startTourBtnLabel">`

## Zu ändernder Code

```html
<!-- vorher -->
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnLegendModal">Schliessen</span></button>
</div>
```

```html
<!-- nachher -->
<div class="modal-footer">
  <button type="button" class="btn btn-primary" id="start-tour-btn">
    <span id="startTourBtnLabel">Tour starten</span>
  </button>
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnLegendModal">Schliessen</span></button>
</div>
```

## Hinweis
`data-bs-dismiss="modal"` wird am CTA-Button **nicht** gesetzt, da das Schließen von einem eigenen Event-Listener in TASK-003 übernommen wird (inklusive `map.fitBounds()`).

## Schritte
- [x] `index.html` öffnen
- [x] `<div class="modal-footer">` im `#startModal` (Zeile ~45) suchen
- [x] Neuen `btn-primary`-Button mit ID `start-tour-btn` vor dem bestehenden Button einfügen
- [ ] Im Browser prüfen: Footer zeigt zwei Buttons; primärer Button ist optisch hervorgehoben

## Status
Erledigt

## Aufwand
XS
