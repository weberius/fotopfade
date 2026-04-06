# User-Story-012-TASK-002: `index.html` – `#aboutModalDiv` vollständig entfernen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Das bisherige kombinierte Modal mit Tab-Navigation (`#aboutModalDiv`) vollständig aus `index.html` entfernen. Darin enthalten sind der Tab-Header (`#aboutTabsHeader`), der Tab-Content-Container (`#aboutTabsContent`) sowie alle fünf `.tab-pane`-Divs mit ihren Card-Kindelementen.

## Technische Details
- Betroffene Datei: `index.html`
- Zeilen: 82–131 (ca.)

## Zu entfernendes Markup

```html
<div class="modal fade" id="aboutModalDiv" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="welcomeModelTitle">Willkommen zu den Fotopfade</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs nav-justified" id="aboutTabsHeader">
          <!-- will be set after loading -->
        </ul>
        <div class="tab-content" id="aboutTabsContent">
          <div class="tab-pane fade show active" id="expectModal">
            <div class="card" id="expectModalLi">
              <!-- will be set after loading -->
            </div>
          </div>
          <div class="tab-pane fade" id="aboutModal">
            <div class="card" id="aboutModalLi">
              <!-- will be set after loading -->
            </div>
         </div>
          <div class="tab-pane fade" id="featuresModal">
            <div class="card" id="featuresModalLi">
              <!-- will be set after loading -->
            </div>
          </div>
          <div class="tab-pane fade" id="linksModal">
            <div class="card" id="linksModalLi">
              <!-- will be set after loading -->
            </div>
          </div>
          <div class="tab-pane fade" id="resourcesModal">
            <div class="card" id="resourcesModalLi">
              <!-- will be set after loading -->
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnAboutModal">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

## Schritte
- [ ] `index.html` öffnen
- [ ] Den gesamten `<div class="modal fade" id="aboutModalDiv">…</div><!-- /.modal -->`-Block entfernen
- [ ] Prüfen: `id="aboutModalDiv"`, `id="aboutTabsHeader"`, `id="aboutTabsContent"` sind nicht mehr vorhanden
- [ ] Prüfen: `id="welcomeModelTitle"`, `id="closeBtnAboutModal"` sind nicht mehr vorhanden
- [ ] Prüfen: Die fünf Tab-IDs `expectModal`, `aboutModal`, `featuresModal`, `linksModal`, `resourcesModal` (sowie die zugehörigen Card-IDs `*Li`) sind nicht mehr in diesem Block vorhanden (sie werden in TASK-003 als neue eigenständige Modals neu angelegt)

## Reihenfolge
Dieser Task muss **atomar mit TASK-003 in einem Commit** ausgeführt werden. Sobald `#aboutModalDiv` entfernt ist, sind die fünf Card-IDs (`expectModalLi`, `aboutModalLi`, `featuresModalLi`, `linksModalLi`, `resourcesModalLi`) nicht mehr im DOM. `locale.js` würde in diesem Zwischenzustand `null` zurückbekommen und einen `TypeError` werfen. TASK-003 muss also im selben Commit abgeschlossen sein, bevor die Änderung deployed wird. Darüber hinaus muss dieser Task **vor TASK-005** abgeschlossen sein, da `locale.js` in TASK-005 auf die neuen Element-IDs umgestellt wird.

## Ergebnis
Kein Tab-Modal `#aboutModalDiv` mehr in `index.html`; Tab-Navigation vollständig entfernt.

## Status
Offen

## Aufwand
XS
