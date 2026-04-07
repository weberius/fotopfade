# User Story: JavaScript- und CSS-Bibliotheken aktualisieren

## Aktualisierung der eingesetzten Frontend-Abhängigkeiten

**Als** Entwickler der Fotopfad-Webapp  
**möchte ich** alle eingesetzten JavaScript- und CSS-Bibliotheken auf ihre jeweils aktuelle Version aktualisieren,  
**damit** bekannte Sicherheitslücken geschlossen, neue Features genutzt und technische Schulden minimiert werden.

### Hintergrund

Eine Bestandsaufnahme (Stand: April 2026) ergab folgende Abweichungen zwischen eingesetzten und aktuellen Versionen:

#### CDN-Einbindungen (`index.html`)

| Library | Eingesetzt | Aktuell | Priorität |
|---|---|---|---|
| Bootstrap Icons | 1.11.3 | **1.13.1** | niedrig |
| Leaflet-locatecontrol | 0.81.0 | **0.89.0** | mittel |
| DataTables | 2.0.3 | **2.3.7** | mittel |
| marked | *kein Version-Pin!* | 17.0.6 | **kritisch** |
| i18next | 23.11.1 | **26.0.3** | hoch |
| i18next-browser-languagedetector | 7.2.1 | **8.2.1** | hoch |
| jQuery | 3.7.1 | 4.0.0 | *separat evaluieren* |

Aktuelle CDN-Einbindungen ohne Handlungsbedarf:

| Library | Version | Status |
|---|---|---|
| Bootstrap | 5.3.8 | ✅ aktuell |
| Leaflet | 1.9.4 | ✅ aktuell |
| Leaflet.markercluster | 1.5.3 | ✅ aktuell |

#### Lokal eingebundene Bibliotheken (`assets/`)

| Library | Pfad | Eingesetzt | Aktuell | Priorität |
|---|---|---|---|---|
| GLightbox | `assets/glightbox/` | 3.3.0 | **3.3.1** | niedrig |
| i18next-http-backend | `assets/i18next/i18nextHttpBackend.js` | unbekannt | **3.0.4** | mittel |
| leaflet.groupedlayercontrol | `assets/leaflet/` | unbekannt | **v0.6.1** | niedrig |

### Kritischer Befund: `marked` ohne Version-Pin

Die aktuelle CDN-URL für `marked` lautet:
```
https://cdn.jsdelivr.net/npm/marked/marked.min.js
```
Ohne explizite Versionangabe liefert jsDelivr die jeweils aktuelle Version, was bei Breaking Changes (z. B. v1 → v17) zu unvorhersehbarem Verhalten führt. Diese URL muss **sofort** mit einem gültigen Version-Pin versehen werden.

### Hinweis zu jQuery 4.x und i18next 26.x

jQuery 4.0.0 und i18next 26.x enthalten **Breaking Changes** gegenüber den eingesetzten Versionen. Vor dem Upgrade sind die betroffenen Stellen im Anwendungscode zu prüfen und ggf. anzupassen. Diese Upgrades werden als eigene Tasks klar abgegrenzt.

### Akzeptanzkriterien

* **marked** ist mit einem expliziten Version-Pin in `index.html` eingebunden.
* Alle CDN-Libraries aus der Tabelle „Handlungsbedarf" sind auf die angegebene aktuelle Version aktualisiert.
* Die lokal gespeicherten Bibliotheken (GLightbox, i18next-http-backend, leaflet.groupedlayercontrol) sind auf die aktuellen Versionen aktualisiert; Dateinamen oder Header tragen die Versionsnummer.
* Die Webapp startet fehlerfrei; die Browser-Konsole zeigt keine neuen Fehler im Zusammenhang mit den aktualisierten Libraries.
* jQuery 4.0.0 wurde geprüft: entweder erfolgreich migriert oder bewusst auf dem Stand 3.7.x belassen mit dokumentierter Begründung.

### Betroffene Dateien

| Datei | Warum betroffen |
|---|---|
| `index.html` | CDN-URLs der Libraries aktualisieren |
| `assets/glightbox/glightbox.js` | Neue Version einpflegen |
| `assets/glightbox/glightbox.css` | Neue Version einpflegen |
| `assets/i18next/i18nextHttpBackend.js` | Neue Version einpflegen |
| `assets/leaflet/leaflet.groupedlayercontrol.js` | Neue Version einpflegen |
| `assets/leaflet/leaflet.groupedlayercontrol.css` | Neue Version einpflegen |

### Aufgaben (Tasks)

- [ ] **TASK-001** `index.html` – `marked`-CDN-URL sofort mit Version-Pin versehen (z. B. `marked@17.0.6`)
- [ ] **TASK-002** `index.html` – Bootstrap Icons von 1.11.3 auf 1.13.1 aktualisieren (CSS-Link)
- [ ] **TASK-003** `index.html` – Leaflet-locatecontrol von 0.81.0 auf 0.89.0 aktualisieren (CSS-Link + Script-Tag)
- [ ] **TASK-004** `index.html` – DataTables von 2.0.3 auf 2.3.7 aktualisieren (CSS-Link + Script-Tag)
- [ ] **TASK-005** `index.html` + ggf. `app.js` – i18next von 23.11.1 auf 26.0.3 aktualisieren; Breaking Changes prüfen und Anpassungen vornehmen
- [ ] **TASK-006** `index.html` – i18next-browser-languagedetector von 7.2.1 auf 8.2.1 aktualisieren
- [ ] **TASK-007** `assets/glightbox/` – GLightbox 3.3.1 herunterladen und lokale Dateien (`glightbox.js`, `glightbox.css`) ersetzen
- [ ] **TASK-008** `assets/i18next/` – i18next-http-backend 3.0.4 herunterladen und `i18nextHttpBackend.js` ersetzen
- [ ] **TASK-009** `assets/leaflet/` – leaflet.groupedlayercontrol v0.6.1 herunterladen und lokale Dateien ersetzen
- [ ] **TASK-010** `index.html` + ggf. `app.js` – jQuery-Upgrade von 3.7.1 auf 4.0.0 evaluieren: Breaking Changes analysieren, Code anpassen oder Upgrade mit Begründung zurückstellen
