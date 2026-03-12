# User Story: Upgrade auf Bootstrap 5

## Umstellung von Bootstrap 3.3.5 auf Bootstrap 5.3.8

**Als** Nutzer der Fotopfad-Webapp  
**möchte ich** eine moderne, schnelle und barrierefreie Oberfläche erleben,  
**damit** die App auf aktuellen Geräten und Browsern zuverlässig, zugänglich und optisch zeitgemäß funktioniert.

**Als** Entwickler der Fotopfad-Webapp  
**möchte ich** auf Bootstrap 5 umstellen,  
**damit** ich von aktiv gepflegten Komponenten, verbessertem CSS-Grid, nativer CSS-Custom-Properties-Unterstützung und dem Wegfall der jQuery-Abhängigkeit profitiere.

### Hintergrund

Die Webapp verwendet derzeit Bootstrap 3.3.5 (Veröffentlichung: 2015). Bootstrap 3 wird seit 2019 nicht mehr aktiv weiterentwickelt und erhält keine Sicherheitsupdates mehr. Die aktuelle stabile Version ist **Bootstrap 5.3.8**.

Bootstrap 5 bringt gegenüber Version 3 folgende wesentliche Verbesserungen:

| Bereich | Bootstrap 3.3.5 | Bootstrap 5.3.8 |
|---|---|---|
| jQuery | **Pflicht** | **nicht mehr benötigt** |
| IE-Unterstützung | IE 8+ | entfällt (moderne Browser) |
| Grid-System | 4 Breakpoints | 6 Breakpoints (inkl. `xxl`) |
| CSS-Variablen | keine | vollständige Unterstützung |
| Barrierefreiheit (a11y) | eingeschränkt | deutlich verbessert |
| Dark Mode | nicht vorhanden | integriert |
| Utility-Klassen | begrenzt | umfangreich (Flexbox, Gap, …) |
| Icons | externe Abhängigkeit (Font Awesome) | Bootstrap Icons als eigenes Paket |
| Pflege / Security | **End of Life** | aktiv gepflegt |

### Akzeptanzkriterien

* **Abhängigkeit aktualisiert:** Die CDN-Einbindung in `index.html` verweist auf Bootstrap 5.3.8 (CSS und JS).
* **jQuery entfernt oder optional:** jQuery wird nicht mehr als Pflichtabhängigkeit für Bootstrap-Komponenten benötigt; vorhandene jQuery-Nutzung im App-Code wird geprüft und ggf. durch natives JavaScript ersetzt.
* **Bestehende UI unverändert:** Navigation, Modals, Buttons, Grid-Layout und alle sichtbaren Komponenten verhalten sich nach der Umstellung wie zuvor (kein visueller Regressionsbruch).
* **Klassen-Migration:** Bootstrap-3-spezifische Klassen (z. B. `col-xs-*`, `panel`, `glyphicon`) werden auf ihre Bootstrap-5-Entsprechungen migriert.
* **Font Awesome überprüft:** Da Bootstrap 5 keine Glyphicons mehr enthält, wird geprüft, ob Font Awesome oder Bootstrap Icons die benötigten Symbole bereitstellen; die Einbindung wird konsolidiert.
* **Keine JavaScript-Fehler:** Die Browser-Konsole zeigt nach der Umstellung keine neuen Fehler durch inkompatible Bootstrap-APIs.
* **Responsives Verhalten erhalten:** Die App verhält sich auf Smartphone, Tablet und Desktop korrekt.

### Technische Hinweise

* Breaking Changes zwischen Bootstrap 3 und 5 sind dokumentiert unter: https://getbootstrap.com/docs/5.3/migration/
* Die wichtigsten Umbenennungen:
  * `col-xs-*` → `col-*`
  * `.panel` → `.card`
  * `.btn-default` → `.btn-secondary`
  * `.glyphicon-*` → Bootstrap Icons `bi bi-*` oder Font Awesome
  * Modals: `data-toggle` / `data-target` → `data-bs-toggle` / `data-bs-target`
  * jQuery-Events (`.on('shown.bs.modal', ...)`) sind weiterhin verfügbar, wenn jQuery eingebunden bleibt
* Bootstrap 5 JS erfordert **kein** separates Popper.js-Bundle, wenn das `bootstrap.bundle.min.js` verwendet wird.
* CDN-Einbindung (Bootstrap 5.3.8):
  ```html
  <!-- CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <!-- JS Bundle (inkl. Popper) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
  ```
