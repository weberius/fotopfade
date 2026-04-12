# User-Story-024-TASK-001: `index.html` — Sprachbutton in den Header verschieben

## Zugehörige Story
User-Story-024 – Flexible Sprachwahl & Automatik

## Beschreibung
Der bestehende Sprachselektor (`<li class="dropdown">` mit `#toolsDrop` und
`#languageSelectorUl`) wird aus dem Burger-Menü (`#navbarMenu`) entfernt. Im
sichtbaren Bereich des Headers (außerhalb des Collapse, zwischen Brand-Link und
Navbar-Toggler) wird ein neuer, immer sichtbarer Sprachbutton eingefügt.

Der Button zeigt das Globus-Icon und das aktuelle Sprachkürzel (`#lang-btn-label`).
Das Dropdown-Menü (`#languageSelectorUl`) bleibt als Bezeichner erhalten, damit
die `LanguageSelector`-Klasse in `locale.js` ohne Änderung des Element-IDs
weiterarbeiten kann.

## Betroffene Datei
- `index.html`

---

## Alter Code (zu ersetzen)

### 1. Sprachselektor-`<li>` im Burger-Menü entfernen

```html
<nav class="navbar navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" id="brand">Pfade</a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarMenu"
            aria-controls="navbarMenu" aria-expanded="false"
            aria-label="Navigation öffnen">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="nav navbar-nav">
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="full-extent-btn"><i class="bi bi-play-fill"></i>&nbsp;<span id="zoomSelectorSpan">Zoom</span></a></li>
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="legend-btn"><i class="bi bi-table"></i>&nbsp;<span id="routeSelectorSpan">Route</span></a></li>
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="gallery-btn"><i class="bi bi-images"></i>&nbsp;<span id="gallerySelectorSpan">Galerie</span></a></li>
        <li class="dropdown">
          <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-globe2"></i>&nbsp;&nbsp;<span id="languageSelectorA">Sprache</span></a>
          <ul class="dropdown-menu" id="languageSelectorUl">
            <!-- content will be injected by Class LanguageSelector -->
          </ul>
        </li>
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="geschichte-btn"><i class="bi bi-person-check"></i>&nbsp;<span id="geschichteSelectorSpan">Geschichte</span></a></li>
```

---

## Neuer Code

```html
<nav class="navbar navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" id="brand">Pfade</a>
    <div class="dropdown ms-auto me-2">
      <button id="lang-btn" class="btn btn-sm btn-outline-light dropdown-toggle lang-btn"
              type="button" data-bs-toggle="dropdown" aria-expanded="false"
              aria-label="Sprache wählen">
        <i class="bi bi-globe2"></i> <span id="lang-btn-label">DE</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end" id="languageSelectorUl"
          aria-labelledby="lang-btn">
        <!-- content will be injected by LanguageSelector -->
      </ul>
    </div>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarMenu"
            aria-controls="navbarMenu" aria-expanded="false"
            aria-label="Navigation öffnen">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="nav navbar-nav">
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="full-extent-btn"><i class="bi bi-play-fill"></i>&nbsp;<span id="zoomSelectorSpan">Zoom</span></a></li>
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="legend-btn"><i class="bi bi-table"></i>&nbsp;<span id="routeSelectorSpan">Route</span></a></li>
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="gallery-btn"><i class="bi bi-images"></i>&nbsp;<span id="gallerySelectorSpan">Galerie</span></a></li>
        <li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="geschichte-btn"><i class="bi bi-person-check"></i>&nbsp;<span id="geschichteSelectorSpan">Geschichte</span></a></li>
```

### Wichtige Punkte
- Der neue `<div class="dropdown">` sitzt **vor** dem `navbar-toggler` und **außerhalb** von `#navbarMenu`.
- `ms-auto` schiebt den Button rechtsbündig, `me-2` gibt Abstand zum Toggler.
- `dropdown-menu-end` öffnet das Dropdown nach links, sodass es nicht über den rechten Rand überläuft.
- **`btn-outline-light` statt `btn-dark`**: Auf der dunklen Navbar (`bg-dark`) hätte `btn-dark` denselben Hintergrund wie die Navbar — der Button wäre unsichtbar. `btn-outline-light` ergibt einen dezenten weißen Rahmen, der ohne Custom-CSS bereits sichtbar ist.
- `aria-labelledby="lang-btn"` auf dem `<ul>` ist für Screen-Reader-Kompatibilität erforderlich (Bootstrap 5 Dropdown-Konvention).
- Das `id="languageSelectorUl"` bleibt unverändert — `LanguageSelector` in `locale.js` muss nicht angepasst werden.
- Das bisherige `id="languageSelectorA"` (der `<span>` „Sprache") entfällt ersatzlos; die entsprechende Zeile in `locale.js` (`updateContent`) wird in TASK-003 entfernt.
