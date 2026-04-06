# User-Story-011-TASK-003: `assets/css/app.css` – Sidebar-spezifische CSS-Regeln entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Alle CSS-Regeln entfernen, die ausschließlich der Sidebar dienen. Die Regeln für `#map` und allgemeine Layout-Regeln bleiben erhalten.

## Technische Details
- Betroffene Datei: `assets/css/app.css`

## Zu entfernende CSS-Blöcke

**Zeilen 54–61** – `#sidebar`:
```css
#sidebar {
  display: block;
  width: 250px;
  height: 100%;
  max-width: 100%;
  float: left;
  transition: width 350ms;
}
```

**Zeilen 62–65** – `#sidebar.sidebar-hidden`:
```css
#sidebar.sidebar-hidden {
  width: 0;
  overflow: hidden;
}
```

**Zeilen 71–77** – `#features`:
```css
#features {
  margin: 0px;
  border: none;
  border-radius: 0px;
  -webkit-box-shadow: none;
    box-shadow: none;
}
```

**Zeilen 78–80** – `#sidebar-hide-btn`:
```css
#sidebar-hide-btn {
  margin-top: -2px;
}
```

**Zeilen 138–142** – `.sidebar-wrapper`:
```css
.sidebar-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
```

**Zeilen 143–150** – `.sidebar-table`:
```css
.sidebar-table {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 0px;
  overflow: auto;
}
```

**Zeilen 217–219** – `#sidebar` innerhalb Media-Query `@media (max-width: 767px)`:
```css
#sidebar {
  display: none;
}
```

## Schritte
- [ ] `assets/css/app.css` öffnen
- [ ] Die sechs oben genannten Regelblöcke entfernen
- [ ] Im `@media (max-width: 767px)`-Block den `#sidebar { display: none; }`-Eintrag entfernen (der restliche Media-Query-Block bleibt erhalten)
- [ ] Prüfen: Keine Referenz auf `sidebar` mehr in `app.css`

## Ergebnis
`app.css` enthält keine sidebar-spezifischen Regeln mehr.

## Status
Offen

## Aufwand
S
