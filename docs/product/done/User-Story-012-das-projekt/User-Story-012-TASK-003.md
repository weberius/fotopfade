# User-Story-012-TASK-003: `index.html` – 5 neue eigenständige Modal-Divs hinzufügen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Nach dem Entfernen des `#aboutModalDiv` (TASK-002) werden fünf neue, eigenständige `<div class="modal fade">`-Dialoge eingefügt. Jeder Dialog erhält einen eigenen Titel-Span, einen Card-Body-Container für den per `ModalBuilder` geladenen Markdown-Inhalt und einen lokalisierbaren Schließen-Button.

## Technische Details
- Betroffene Datei: `index.html`
- Einfügeposition: An der Stelle, wo bisher `#aboutModalDiv` stand (unmittelbar vor `#legendModal`)

## Einzufügendes Markup

```html
<!-- Geschichte -->
<div class="modal fade" id="geschichteModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="geschichteModalTitle">Geschichte</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="expectModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnGeschichteModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Über das Projekt -->
<div class="modal fade" id="ueberModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="ueberModalTitle">Über das Projekt</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="aboutModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnUeberModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Features -->
<div class="modal fade" id="featuresModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="featuresModalTitle">Features</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="featuresModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnFeaturesModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- QR-Code -->
<div class="modal fade" id="linksModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="linksModalTitle">QR-Code</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="linksModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnLinksModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Quellen -->
<div class="modal fade" id="resourcesModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="resourcesModalTitle">Quellen</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="resourcesModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnResourcesModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

### Neue IDs im Überblick

| Dialog           | Modal-ID             | Titel-Span-ID          | Card-ID           | CloseBtn-Span-ID            |
|------------------|----------------------|------------------------|-------------------|-----------------------------|
| Geschichte       | `geschichteModalDiv` | `geschichteModalTitle` | `expectModalLi`   | `closeBtnGeschichteModal`   |
| Über das Projekt | `ueberModalDiv`      | `ueberModalTitle`      | `aboutModalLi`    | `closeBtnUeberModal`        |
| Features         | `featuresModalDiv`   | `featuresModalTitle`   | `featuresModalLi` | `closeBtnFeaturesModal`     |
| QR-Code          | `linksModalDiv`      | `linksModalTitle`      | `linksModalLi`    | `closeBtnLinksModal`        |
| Quellen          | `resourcesModalDiv`  | `resourcesModalTitle`  | `resourcesModalLi`| `closeBtnResourcesModal`    |

> **Hinweis:** Die Card-IDs (`expectModalLi`, `aboutModalLi`, `featuresModalLi`, `linksModalLi`, `resourcesModalLi`) bleiben bewusst unverändert, da `locale.js` diese IDs zum Laden der Markdown-Inhalte über `ModalBuilder.loadMarkdown()` verwendet.

## Schritte
- [ ] `index.html` öffnen
- [ ] Fünf neue Modal-Blöcke an der Stelle einfügen, wo zuvor `#aboutModalDiv` stand (vor `#legendModal`)
- [ ] Prüfen: Alle fünf Modal-IDs (`geschichteModalDiv`, `ueberModalDiv`, `featuresModalDiv`, `linksModalDiv`, `resourcesModalDiv`) sind vorhanden
- [ ] Prüfen: Alle Card-IDs (`expectModalLi`, `aboutModalLi`, `featuresModalLi`, `linksModalLi`, `resourcesModalLi`) sind jeweils einmal vorhanden

## Reihenfolge
Dieser Task muss **atomar mit TASK-002 in einem Commit** ausgeführt werden (gleiche Datei, unmittelbar aufeinanderfolgende Änderung; Zwischenzustand würde Card-IDs entfernen, bevor neue Modals vorhanden sind). TASK-002 muss innerhalb desselben Commits abgeschlossen sein. Dieser Task ist **Voraussetzung für TASK-004 und TASK-005**.

## Ergebnis
Fünf eigenständige modale Dialoge in `index.html`; jeder Dialog ist über seine eigene `id` ansteuerbar.

## Status
Offen

## Aufwand
S
