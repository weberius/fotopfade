# User-Story-023-TASK-002: `assets/css/app.css` — CSS für das neue POI-Modal

## Zugehörige Story
User-Story-023 – Audio-First POI-Darstellung

## Beschreibung
Neue CSS-Klassen für das redesignte `#featureModal`.
Bestehendes CSS für `#feature-info` und `#feature-info img` wird entfernt
(wird durch die neuen Klassen ersetzt).

## Betroffene Datei
- `assets/css/app.css`

---

## Zu entfernende CSS-Regeln

```css
#feature-info {
  display: inline-block;
}

#feature-info img {
  width:50%;
  height: auto;
  float: right;
  margin: 10px 10px 10px 20px;
}

#feature-info img[src*="#pano"] {
  width:100%;
  height: auto;
  margin: 10px 0px 10px 20px;
}
```

---

## Hinzuzufügende CSS-Regeln

Am Ende von `app.css` einfügen:

```css
/* -----------------------------------------------------------------------
   POI-Modal: Audio-First Layout (User-Story-023)
   ----------------------------------------------------------------------- */

/* 1:1-Bildbox — Hoch- und Querformat werden gleich groß, gefüllt dargestellt */
.poi-image-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.poi-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Content-Bereich unterhalb des Bildes */
/* Clearfix für den gefloateten Play-Button — KEIN overflow:hidden, da der Button
   mit negativem margin-top in die Bildbox hineinragt und sonst abgeschnitten würde. */
.poi-content-area::after {
  content: '';
  display: table;
  clear: both;
}

/* Runder Play/Pause-Button, floated links, ragt mit negativem margin-top ins Bild.
   float:left steuert den Textfluss (Text umfließt den Button).
   display:flex zentriert das SVG im Button-Kreis.
   Beide Eigenschaften auf demselben Element sind in modernen Browsern gültig. */
.poi-play-btn {
  float: left;
  margin-top: -28px;   /* halbe Button-Höhe (56px/2) — überlappt das Bild von unten */
  margin-right: 12px;
  margin-bottom: 6px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.30);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;  /* Stacking-Kontext, damit der Button über dem Bild liegt */
  z-index: 10;
}

.poi-play-btn svg {
  width: 22px;
  height: 22px;
  fill: #333333;
}

/* Play/Pause Icon-Umschaltung via CSS-Klasse .is-playing auf dem Button.
   Standard: Dreieck sichtbar, Balken versteckt.
   Mit .is-playing: Balken sichtbar, Dreieck versteckt. */
.poi-play-btn #feature-play-icon    { display: block; }
.poi-play-btn .pause-bar            { display: none; }
.poi-play-btn.is-playing #feature-play-icon { display: none; }
.poi-play-btn.is-playing .pause-bar         { display: block; }

/* Teaser-Text fließt um den gefloateten Button */
#feature-text {
  font-size: 14px;
  margin: 0;
}

/* Dezenter KI-Hinweis */
.poi-ki-hint {
  clear: left;         /* unterhalb des gefloateten Buttons beginnen */
  font-size: 11px;
  color: #999999;
  font-style: italic;
  margin-top: 8px;
  margin-bottom: 0;
}
```

---

## Hinweise
- `aspect-ratio: 1 / 1` wird von allen modernen Mobilbrowsern (iOS Safari ≥ 15,
  Chrome ≥ 88) unterstützt. Ältere Browser zeigen das Bild mit `auto` Höhe.
- Der negative `margin-top` von `-28px` entspricht der halben Button-Höhe (56 px / 2).
  Damit ragt der Button optisch halb ins Bild, halb in den Text.
- **Kein `overflow: hidden`** auf `.poi-content-area` — das würde den nach oben ragenden
  Button abschneiden. Der Clearfix wird ausschließlich über `::after` realisiert.
- `z-index: 10` auf `.poi-play-btn` stellt sicher, dass der Button beim Übergang
  über das Bild klickbar bleibt.
- `clear: left` auf `.poi-ki-hint` verhindert, dass der Hinweis neben dem Button
  erscheint, falls der Teaser-Text sehr kurz ist.
- Das Icon-Wechseln (Play ↔ Pause) geschieht ausschließlich per CSS-Klasse `.is-playing`
  auf dem Button-Element — kein `setAttribute` auf SVG-Attribute nötig (→ TASK-003).
