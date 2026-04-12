# User-Story-023-TASK-001: `index.html` — Umbau des `#featureModal` auf neues Layout

## Zugehörige Story
User-Story-023 – Audio-First POI-Darstellung

## Beschreibung
Das bestehende `#featureModal` wird auf das neue Audio-First-Layout umgebaut.
Der einfache `<div class="modal-body" id="feature-info"></div>`, in den bisher
rohes HTML eingefügt wird, wird durch eine feste DOM-Struktur ersetzt, die
gezielt per JavaScript befüllt wird.

### Neues Struktur-Konzept

```
modal-header     → Titel des POI
modal-body
  poi-image-box  → 1:1-Quadrat, Bild via object-fit: cover
  poi-play-btn   → runder Play-Button, float:left, ragt ins Bild
  poi-text-body  → Teaser-Text umfließt den Button
  feature-audio  → <audio>-Element (unsichtbar, kein Autoplay)
modal-footer     → „Schliessen"-Button
```

## Betroffene Datei
- `index.html`

## Alter Code (zu ersetzen)

```html
<div class="modal fade" id="featureModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="feature-title"></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body" id="feature-info"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnFeatureModel">Schliessen</span></button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

## Neuer Code

```html
<div class="modal fade" id="featureModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="feature-title"></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body p-0">
        <div class="poi-image-box">
          <img id="feature-image" src="" alt="" />
        </div>
        <div class="poi-content-area px-3 pt-2 pb-3">
          <button id="feature-play-btn" class="poi-play-btn" aria-label="Audio abspielen">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <!-- Play-Dreieck (Standard-Zustand) -->
              <polygon id="feature-play-icon" points="6,4 20,12 6,20"/>
              <!-- Pause-Balken (via CSS-Klasse .is-playing eingeblendet) -->
              <rect id="feature-pause-bar-1" class="pause-bar" x="5" y="4" width="4" height="16"/>
              <rect id="feature-pause-bar-2" class="pause-bar" x="15" y="4" width="4" height="16"/>
            </svg>
          </button>
          <p id="feature-text"></p>
          <p class="poi-ki-hint" id="feature-ki-hint"></p>
        </div>
        <audio id="feature-audio" preload="none"></audio>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          <span id="closeBtnFeatureModel">Schliessen</span>
        </button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

## Hinweise
- `modal-dialog` bleibt ohne `-lg` (schmales Modal passend zu quadratischem Bild).
- `modal-body p-0` entfernt den Bootstrap-Innenabstand, damit das Bild bündig ist.
- `poi-content-area` enthält float-basierten Play-Button und Fließtext.
- `#feature-audio` ist unsichtbar; Steuerung erfolgt ausschließlich über `#feature-play-btn`.
- Das SVG enthält beide Icon-Zustände: `#feature-play-icon` (Dreieck) und die beiden
  `#feature-pause-bar-*`-Rechtecke. Welcher Zustand sichtbar ist, steuert die CSS-Klasse
  `.is-playing` auf dem Button (siehe TASK-002). Kein JavaScript-SVG-Punkt-Manipulation nötig.
- `aria-hidden="true"` am SVG verhindert doppeltes Vorlesen durch Screen-Reader,
  da der Button selbst bereits `aria-label` trägt.
- IDs `feature-title`, `feature-image`, `feature-play-btn`, `feature-play-icon`,
  `feature-pause-bar-1`, `feature-pause-bar-2`, `feature-text`, `feature-ki-hint`,
  `feature-audio`, `closeBtnFeatureModel` sind die Ankerpunkte für TASK-003 (app.js).
