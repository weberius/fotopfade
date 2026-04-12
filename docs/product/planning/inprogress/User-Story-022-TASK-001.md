# User-Story-022-TASK-001: `index.html` – Modaler Dialog `#hilfeModalDiv` ergänzen

## Zugehörige Story
User-Story-022 – Hilfe: Bedienungshinweise über ein Karten-Control

## Beschreibung
Der modale Dialog für die Bedienungshinweise wird in `index.html` ergänzt.
Er folgt exakt dem Aufbau der bestehenden Dialoge (Geschichte, Über das Projekt,
Features usw.): Header mit Titel und X-Button, Body mit `.card`-Container
(Inhalt wird per `ModalBuilder` aus Markdown geladen), Footer mit
Schliessen-Button.

## Technische Details
- Betroffene Datei: `index.html`
- Einfügeposition: nach dem letzten bestehenden modalen Dialog analog
  (nach dem `<!-- Quellen -->`-Block, vor dem `#legendModal`)
- Modal-ID: `hilfeModalDiv`
- Größe: `modal-lg` (wie Geschichte, Über, Features)
- Body-Container-ID: `hilfeModalLi` (Referenz für `ModalBuilder`)
- Titel-Span-ID: `hilfeModalTitle`
- Schliessen-Button-Span-ID: `closeBtnHilfeModal`

## Einzufügender Code

```html
<!-- Hilfe -->
<div class="modal fade" id="hilfeModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="hilfeModalTitle">Bedienungshinweise</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="hilfeModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnHilfeModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

## Einfügekontext (Umgebung)

```html
<!-- Quellen -->
<div class="modal fade" id="resourcesModalDiv" ...>
  ...
</div><!-- /.modal -->

<!-- Hilfe -->   ← hier einfügen

<div class="modal fade" id="legendModal" ...>
```

## Schritte
- [ ] `index.html` öffnen
- [ ] Block `<!-- Quellen -->` (id="resourcesModalDiv") aufsuchen
- [ ] Neuen Dialog `#hilfeModalDiv` direkt danach, vor `#legendModal`, einfügen
- [ ] Im Browser syntax-check: Seite lädt ohne Fehler

## Status
Offen

## Aufwand
XS
