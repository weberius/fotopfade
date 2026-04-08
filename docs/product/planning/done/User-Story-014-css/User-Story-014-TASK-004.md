# User-Story-014-TASK-004: `index.html` – Attribution-Modal mit `modal-header` und `modal-body` strukturieren

## Zugehörige Story
User-Story-014 – Einheitliches Erscheinungsbild der Benutzeroberfläche

## Beschreibung
Das `attributionModal` besitzt kein `modal-header`-Element und damit keinen sichtbaren Titel. Außerdem liegt das `<div class="card" id="attributionModalLi">` direkt in `modal-content` statt in einem `modal-body`. Die Struktur ist auf den Standard aller anderen Dialoge anzugleichen.

## Technische Details
- Betroffene Datei: `index.html`
- Betroffenes Modal: `attributionModal`

## Zu änderndes Markup

```html
<!-- vorher -->
<div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="card" id="attributionModalLi">
        <!-- will be set after loading -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnAboutModal">Schliessen</span></button>
      </div>
    </div>
  </div><!-- /.modal -->
</div>
```

```html
<!-- nachher -->
<div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="attributionModalTitle">Attribution</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="attributionModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnAboutModal">Schliessen</span></button>
      </div>
    </div>
  </div><!-- /.modal -->
</div>
```

## Reihenfolge
Dieser Task muss **vor TASK-005** ausgeführt werden: In TASK-005 wird `attributionModalTitle` per JavaScript befüllt. Das Element muss im DOM vorhanden sein.

## Schritte
- [x] `index.html` öffnen
- [x] Das `attributionModal` um `modal-header` (mit `<span id="attributionModalTitle">`) und `modal-body` ergänzen
- [x] Prüfen: Attribution-Dialog öffnen – Titel-Bereich sichtbar, Struktur identisch mit anderen Dialogen

## Ergebnis
Der Attribution-Dialog besitzt einen Titel-Bereich und eine korrekte Bootstrap-Modal-Struktur.

## Status
Erledigt

## Aufwand
S
