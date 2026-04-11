# User-Story-021-TASK-005: `assets/css/app.css` – Panoramabild im `#startModalBody` vollständig sichtbar

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Das Panoramabild soll die volle Breite des Modals einnehmen und vollständig dargestellt werden – ohne Beschnitt und ohne unerwünschten Weißraum am unteren Rand. Die bestehende globale Regel `.modal-body img { width: 100%; }` setzt `width`, fehlt aber `height: auto`, `display: block` (verhindert den Browser-Baseline-Gap bei `inline`-Elementen) und `margin: 0`.

Die spezifische Regel für `#startModalBody` ist immer anzuwenden, da sie gilt unabhängig davon, ob das allgemeine `.modal-body img` in einem Browser-Test optisch ausreicht: `display: block` ist für korrekte Layout-Berechnung strukturell notwendig.

## Technische Details
- Betroffene Datei: `assets/css/app.css`
- Bestehende Regel (Zeile ~97): `.modal-body img { width: 100%; }`
- Neue spezifische Regel für `#startModalBody`

## Einzufügende CSS-Regel

```css
#startModalBody img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
}
```

Einfügeposition: direkt nach der bestehenden `.modal-body img`-Regel (Zeile ~100).

## Schritte
- [x] `assets/css/app.css` öffnen
- [x] Block `.modal-body img` (Zeile ~97) aufsuchen
- [x] Neue Regel `#startModalBody img` direkt darunter einfügen
- [ ] Im Browser prüfen: Panoramabild füllt die modale Breite vollständig, kein weißer Spalt unterhalb des Bildes

## Status
Erledigt

## Aufwand
XS
