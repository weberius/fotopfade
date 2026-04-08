# User-Story-020-TASK-001: `index.html` – „Unterstützung" aus Footer entfernen, in Navbar einfügen

## Zugehörige Story
User-Story-020 – Rechtssicherheit & Unterstützung

## Beschreibung
Der Link „Unterstützung" befindet sich derzeit als letzter Eintrag im `<footer>`. Der Footer ist semantisch für Pflichtangaben (Impressum, Disclaimer, Datenschutz) reserviert. Der Link soll als letzter Eintrag ins Hamburger-Menü (`#navbarMenu`) verschoben werden — mit dem Bootstrap-Icon `bi-heart` und einer i18n-fähigen Beschriftung.

## Technische Details
- Betroffene Datei: `index.html`
- Neue Button-ID: `nav-coffee-btn` (ersetzt `footer-coffee-btn`)
- Neue Span-ID für i18n-Text: `coffeeSelectorSpan`

## Zu ändernder Code

### 1. Eintrag aus Footer entfernen

```html
<!-- vorher -->
<nav class="footer-nav">
  <a href="#" id="footer-impressum-btn">Impressum</a>
  <a href="#" id="footer-disclaimer-btn">Disclaimer</a>
  <a href="#" id="footer-datenschutz-btn">Datenschutz</a>
  <a href="#" id="footer-coffee-btn">Unterstützung</a>
</nav>
```

```html
<!-- nachher -->
<nav class="footer-nav">
  <a href="#" id="footer-impressum-btn">Impressum</a>
  <a href="#" id="footer-disclaimer-btn">Disclaimer</a>
  <a href="#" id="footer-datenschutz-btn">Datenschutz</a>
</nav>
```

### 2. Neuen Eintrag als letztes `<li>` in Navbar ergänzen

```html
<!-- vorher: letzter Eintrag im #navbarMenu -->
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="resources-btn"><i class="bi bi-exclamation-circle"></i>&nbsp;<span id="resourcesSelectorSpan">Quellen</span></a></li>
```

```html
<!-- nachher -->
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="resources-btn"><i class="bi bi-exclamation-circle"></i>&nbsp;<span id="resourcesSelectorSpan">Quellen</span></a></li>
<li><a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" id="nav-coffee-btn"><i class="bi bi-heart"></i>&nbsp;<span id="coffeeSelectorSpan">Unterstützung</span></a></li>
```

## Schritte
- [x] `index.html` öffnen
- [x] `<a href="#" id="footer-coffee-btn">Unterstützung</a>` aus dem `<footer>` entfernen
- [x] Neues `<li>` mit `nav-coffee-btn` als letzten Eintrag in `#navbarMenu` einfügen
- [ ] Im Browser prüfen: Footer zeigt nur noch Impressum, Disclaimer, Datenschutz

## Status
Erledigt

## Aufwand
S
