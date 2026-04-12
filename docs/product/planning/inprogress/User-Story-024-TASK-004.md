# User-Story-024-TASK-004: `assets/css/app.css` — Responsive CSS für den Header-Sprachbutton

## Zugehörige Story
User-Story-024 – Flexible Sprachwahl & Automatik

## Beschreibung
Der neue `#lang-btn` im Header benötigt CSS-Regeln, um auf sehr kleinen
Bildschirmen (< 400 px) zu funktionieren, ohne den Brand-Text zu verdrängen.
Auf kleinen Screens wird das Sprachkürzel `#lang-btn-label` ausgeblendet —
nur das Globus-Icon bleibt sichtbar. Ab einer komfortablen Breite ist der
vollständige Button (`🌐 DE`) sichtbar.

## Betroffene Datei
- `assets/css/app.css`

---

## Neuer Code

Am Ende von `app.css` einfügen (nach dem bestehenden `/* Print Handling */`-Block
oder direkt vor den POI-Modal-Regeln):

```css
/* -----------------------------------------------------------------------
   Sprach-Button im Header (User-Story-024)
   ----------------------------------------------------------------------- */

/* Grundstil: dezenter Dark-Button, passt zur Navbar */
.lang-btn {
  font-size: 13px;
  padding: 3px 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  white-space: nowrap;
}

.lang-btn:hover,
.lang-btn:focus {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.6);
}

/* Auf sehr kleinen Screens: Text ausblenden, nur Icon zeigen */
@media (max-width: 400px) {
  #lang-btn-label {
    display: none;
  }
}
```

### Wichtige Punkte
- Der Breakpoint 400 px ist bewusst kleiner als der Bootstrap-`sm`-Breakpoint (576 px),
  damit das Kürzel auf typischen Smartphones (360–414 px) sichtbar bleibt und nur
  auf sehr schmalen Geräten entfällt.
- `white-space: nowrap` verhindert, dass `🌐 DE` in zwei Zeilen umbricht.
- `border: 1px solid rgba(255,255,255,0.25)` macht den Button subtil erkennbar, ohne
  optisch dominant zu wirken — passend zum dunklen Navbar-Hintergrund.
