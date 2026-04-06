# User-Story-010-TASK-005: Bootstrap-Plugin-API in app.js auf Bootstrap-5-API umstellen

## Zugehörige Story
User-Story-010 – Upgrade auf Bootstrap 5

## Beschreibung
Bootstrap 5 stellt keine jQuery-Plugin-Methoden mehr bereit. Die Aufrufe `.modal("show")`,
`.modal("hide")` und `.collapse("hide")` funktionieren daher in BS5 nicht mehr – auch wenn jQuery
weiterhin geladen ist. Alle betroffenen Stellen in `app.js` werden auf die Bootstrap-5-Vanilla-JS-API
umgestellt. Die übrige jQuery-Nutzung (DOM-Events, AJAX, Animationen) bleibt für diesen Task
unverändert und wird in TASK-006 behandelt.

## Technische Details
- Betroffene Datei: `assets/js/app.js`
- Bootstrap-5-Äquivalente:
  - `$("#id").modal("show")` → `bootstrap.Modal.getOrCreateInstance(document.getElementById('id')).show()`
  - `$("#id").modal("hide")` → `bootstrap.Modal.getOrCreateInstance(document.getElementById('id')).hide()`
  - `$(".navbar-collapse.in").collapse("hide")` → `bootstrap.Collapse.getOrCreateInstance(document.querySelector('.navbar-collapse')).hide()`
    (Hinweis: BS3-Zustandsklasse `.in` existiert in BS5 nicht mehr. Das Selektor-Problem entfällt,
    wenn `.getOrCreateInstance` auf das feste Element angewendet wird.)
- Alle betroffenen Stellen in `app.js`:

  | Stelle | alter Aufruf | neuer Aufruf |
  |---|---|---|
  | about-btn Handler | `$("#aboutModalDiv").modal("show")` | `bootstrap.Modal.getOrCreateInstance(document.getElementById('aboutModalDiv')).show()` |
  | full-extent-btn Handler | `$("#startModal").modal("show")` | `bootstrap.Modal.getOrCreateInstance(document.getElementById('startModal')).show()` |
  | legend-btn Handler | `$("#legendModal").modal("show")` | `bootstrap.Modal.getOrCreateInstance(document.getElementById('legendModal')).show()` |
  | about-, full-extent-, legend-btn | `$(".navbar-collapse.in").collapse("hide")` | `bootstrap.Collapse.getOrCreateInstance(document.querySelector('.navbar-collapse')).hide()` |
  | routes-onEachFeature | `routes.onEachFeature` Click-Handler: `$("#featureModal").modal("show")` | `bootstrap.Modal.getOrCreateInstance(document.getElementById('featureModal')).show()` |
  | routes-Klick-Handler | legacy-Bezeichnung, identisch mit routes-onEachFeature (s. o.) | — s. o. — |
  | fetch-Callback (Route) | `$("#startModal").modal("show")` / `.modal("hide")` | analog |
  | pois-Klick-Handler | `$("#featureModal").modal("show")` | analog |
  | Footer-Buttons | `$("#fImpressumModal").modal("show")` u. a. | analog (4 Modals) |

- `$("#nav-btn").click(…)` Handler: Dieser Handler wird entfernt, da `#nav-btn` durch den
  nativen BS5-Toggler in TASK-004 aus dem HTML entfernt wurde (toter Code).
- `$("#featureModal").on("hidden.bs.modal", …)` bleibt unverändert: BS5 feuert dieses Event als
  natives CustomEvent; jQuery delegiert daran korrekt, auch ohne BS5-jQuery-Plugin.

## Schritte
- [ ] Alle `.modal("show")`-Aufrufe durch `bootstrap.Modal.getOrCreateInstance(el).show()` ersetzen;
  `el` ist stets `document.getElementById('<modalId>')`. Betroffen sind explizit:
  - `about-btn`-Handler: `document.getElementById('aboutModalDiv')`
  - `full-extent-btn`-Handler: `document.getElementById('startModal')`
  - `legend-btn`-Handler: `document.getElementById('legendModal')`
  - `routes.onEachFeature` Click-Handler (ca. Zeile 204): `document.getElementById('featureModal')`
  - `pois.onEachFeature` Click-Handler: `document.getElementById('featureModal')`
  - `fetch`-Callback Route (beide Pfade, ca. Zeile 230): `document.getElementById('startModal')`
  - Footer-Buttons (4×): `fImpressumModal`, `fDisclaimerModal`, `fDatenschutzModal`, `fCoffeeModal`
- [ ] Alle `.modal("hide")`-Aufrufe durch `bootstrap.Modal.getOrCreateInstance(el).hide()` ersetzen
- [ ] Alle `$(".navbar-collapse.in").collapse("hide")`-Aufrufe durch
  `bootstrap.Collapse.getOrCreateInstance(document.querySelector('.navbar-collapse')).hide()` ersetzen
- [ ] `$("#nav-btn").click(function() { … })` Block entfernen (toter Code nach TASK-004)
- [ ] Browser-Console nach dem Laden auf Bootstrap-bezogene Fehler prüfen
- [ ] Alle Modals öffnen und schließen testen; Navbar-Collapse auf schmalen Bildschirmen testen

## Ergebnis
Keine Bootstrap-3-jQuery-Plugin-Aufrufe mehr in `app.js`; alle Bootstrap-Interaktionen nutzen die
Bootstrap-5-Vanilla-JS-API. Die übrige jQuery-Nutzung bleibt unverändert.

## Status
Todo

## Aufwand
S
