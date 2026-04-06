# User-Story-011-TASK-002: `index.html` – `<div id="sidebar">` vollständig entfernen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Das gesamte Sidebar-HTML-Element aus `index.html` entfernen. Der Block beginnt mit `<div id="sidebar">` (Zeile 80) und umfasst alle Kindelemente (`.sidebar-wrapper`, `.card#features`, `#feature-list`).

## Technische Details
- Betroffene Datei: `index.html`
- Zeilen: 80–105

## Zu entfernendes Markup

```html
<div id="sidebar">
  <div class="sidebar-wrapper">
    <div class="card" id="features">
      <div class="card-header">
        <h3 class="card-title"><span id="poisPanelTitle">POIs</span>
          <button type="button" class="btn btn-sm btn-secondary float-end" id="sidebar-hide-btn"><i class="bi bi-chevron-left"></i></button></h3>
      </div>
      <div class="sidebar-table">
        <table class="table table-hover" id="feature-list">
          <thead class="hidden">
          <tr><th>Icon</th><tr>
          <tr><th>Name</th><tr>
          <tr><th>Chevron</th><tr>
          </thead>
          <tbody class="list"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

## Schritte
- [ ] `index.html` öffnen
- [ ] Den gesamten `<div id="sidebar">…</div>`-Block entfernen
- [ ] Prüfen: `<div id="map">` ist nun direktes Kind von `<div id="container">`

## Ergebnis
Kein Sidebar-HTML mehr in `index.html`; die Karte füllt den gesamten Container-Bereich.

## Status
Offen

## Aufwand
XS
