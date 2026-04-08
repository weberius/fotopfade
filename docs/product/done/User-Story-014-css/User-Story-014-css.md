# User Story: Einheitliches Erscheinungsbild der Benutzeroberfläche

## Visuelle Konsistenz in Navigation und modalen Dialogen herstellen

**Als** Nutzer der Fotopfad-App  
**möchte ich** eine visuell konsistente Benutzeroberfläche erleben,  
**damit** Navigation und Inhalte klar und aufgeräumt wirken und kein Element unbeabsichtigt hervorsticht.

### Hintergrund

Eine visuelle Prüfung der Oberfläche (Stand: April 2026) ergab folgende Inkonsistenzen:

1. **Burger-Menü**: Alle Menüeinträge erscheinen blau und unterstrichen – ein ungewolltes Link-Styling, das die Navigation unruhig wirken lässt.
2. **POI-Modal-Titel**: Der Titel im modalen Dialog eines Point of Interest wird blau dargestellt, obwohl vergleichbare Dialoge (z. B. „Features") schwarze Titel verwenden.
3. **Rahmen um Modal-Inhalte**: Mehrere modale Dialoge zeigen einen sichtbaren Rahmen (Border) um den Textbereich. Der modale Dialog „Start" dient als Referenz für das korrekte, rahmenlose Erscheinungsbild. Betroffen sind:
   - Geschichte
   - Über das Projekt
   - Features
   - QR-Code
   - Quellen
   - Attribution
4. **Fehlender Titel im Attribution-Dialog**: Der modale Dialog „Attribution" hat keinen sichtbaren Titel. Um konsistent mit allen anderen Dialogen zu sein, soll der Titel „Attribution" ergänzt werden – lokalisiert über die bestehenden i18n-Properties-Dateien.

### Akzeptanzkriterien

* Im geöffneten Burger-Menü sind alle Einträge **grau** und **nicht unterstrichen** dargestellt.
* Der Titel eines POI-Modals wird in **Schwarz** dargestellt (identisch mit dem „Features"-Dialog als Referenz).
* Die modalen Dialoge Geschichte, Über das Projekt, Features, QR-Code, Quellen und Attribution zeigen **keinen Rahmen** um den Textinhalt (identisch mit dem „Start"-Dialog als Referenz).
* Der modale Dialog „Attribution" besitzt einen Titel.
* Der Titel „Attribution" ist in allen unterstützten Sprachen über die jeweiligen i18n-Properties-Dateien konfigurierbar.
* Alle Änderungen sind ausschließlich über CSS oder i18n-Konfiguration umgesetzt – keine strukturellen HTML-Änderungen, die unbeabsichtigte Seiteneffekte erzeugen.
* Die Webapp startet fehlerfrei; die Browser-Konsole zeigt keine neuen Fehler im Zusammenhang mit den Änderungen.

### Betroffene Dateien (vorläufig)

| Datei | Warum betroffen |
|---|---|
| `assets/css/app.css` o. ä. | CSS-Anpassungen für Menü-Links und Modal-Titel/-Rahmen |
| `index.html` | Ggf. Titel-Element im Attribution-Modal ergänzen |
| `locales/<sprache>/translation.json` o. ä. | Lokalisierungsschlüssel `attribution.title` für alle Sprachen |

### Aufgaben (Tasks)

---

#### TASK-001 · CSS – Burger-Menü-Links: grau und nicht unterstrichen

**Datei:** `assets/css/app.css`

**Problem:** Alle `<a>`-Elemente innerhalb von `.nav.navbar-nav` erben Bootstraps Link-Standardfarbe (blau) und text-decoration (unterstrichen).

**Lösung:** Folgende CSS-Regel am Ende von `app.css` ergänzen:

```css
.navbar-nav a {
  color: #6c757d;
  text-decoration: none;
}
.navbar-nav a:hover {
  color: #ffffff;
  text-decoration: none;
}
```

**Akzeptanzkriterium:** Alle Einträge im geöffneten Burger-Menü erscheinen grau und ohne Unterstrich; beim Hover werden sie weiß (passend zur dunklen Navbar).

---

#### TASK-002 · HTML – POI-Modal-Titel: Bootstrap-Klasse `text-primary` entfernen

**Datei:** `index.html`, Zeile 207

**Problem:** Das `<h4>`-Element des POI-Modals trägt die Bootstrap-Klasse `text-primary`, die den Titel blau färbt.

**Ist-Zustand:**
```html
<h4 class="modal-title text-primary" id="feature-title"></h4>
```

**Soll-Zustand:**
```html
<h4 class="modal-title" id="feature-title"></h4>
```

**Akzeptanzkriterium:** Der Titel im POI-Modal wird schwarz dargestellt, identisch mit dem „Features"-Dialog.

---

#### TASK-003 · CSS – Rahmen (Border) der `.card`-Elemente in Modals entfernen

**Datei:** `assets/css/app.css`

**Problem:** Die modalen Dialoge Geschichte, Über das Projekt, Features, QR-Code, Quellen und Attribution rendern ihren Textinhalt jeweils in einem `<div class="card">`. Bootstraps `.card`-Klasse setzt eine sichtbare Border. Der „Start"-Dialog verwendet hingegen `modal-body` ohne `.card` und ist daher rahmenfrei.

Betroffene Element-IDs: `expectModalLi`, `aboutModalLi`, `featuresModalLi`, `linksModalLi`, `resourcesModalLi`, `attributionModalLi`.

**Lösung:** In der bestehenden `.card`-Regel in `app.css` `border: none;` ergänzen:

**Ist-Zustand:**
```css
.card {
    margin: 10px;
    padding: 10px;
}
```

**Soll-Zustand:**
```css
.card {
    margin: 10px;
    padding: 10px;
    border: none;
}
```

**Akzeptanzkriterium:** Alle sechs betroffenen Dialoge zeigen keinen Rahmen um den Textinhalt.

---

#### TASK-004 · HTML – Attribution-Modal: `modal-header` mit Titel und `modal-body` ergänzen

**Datei:** `index.html`

**Problem:** Das `attributionModal` besitzt kein `modal-header`-Element und damit keinen sichtbaren Titel. Das `<div class="card" id="attributionModalLi">` liegt außerdem direkt in `modal-content` statt in einem `modal-body`.

**Ist-Zustand:**
```html
<div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="card" id="attributionModalLi">
        <!-- will be set after loading -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnAboutModal">Schliessen</span></button>
      </div>
    </div>
  </div><!-- /.modal -->
</div>
```

**Soll-Zustand:**
```html
<div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="attributionModalTitle">Attribution</span></h4>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Schliessen"></button>
      </div>
      <div class="modal-body">
        <div class="card" id="attributionModalLi">
          <!-- will be set after loading -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span id="closeBtnAboutModal">Schliessen</span></button>
      </div>
    </div>
  </div><!-- /.modal -->
</div>
```

**Akzeptanzkriterium:** Der Attribution-Dialog zeigt einen Titel-Bereich, der dem Aufbau der anderen Dialoge entspricht.

---

#### TASK-005 · JS – `locale.js`: i18n-Zuweisung für den Attribution-Titel ergänzen

**Datei:** `assets/js/locale.js`

**Problem:** Die Funktion, die beim Sprachwechsel alle Titel-Elemente per `i18next.t()` befüllt, enthält keinen Eintrag für `attributionModalTitle`.

**Lösung:** Nach der Zeile
```js
document.getElementById('resourcesModalTitle').innerHTML = i18next.t('resourcesTitle');
```
folgende Zeile einfügen:
```js
document.getElementById('attributionModalTitle').innerHTML = i18next.t('attributionTitle');
```

**Akzeptanzkriterium:** Der Attribution-Titel wird beim Laden und bei jedem Sprachwechsel korrekt aus der aktiven Sprachdatei gesetzt.

---

#### TASK-006 · i18n – Schlüssel `attributionTitle` in alle `properties.json`-Dateien eintragen

**Dateien (9 Stück):**

| Pfad | Sprache |
|---|---|
| `locales/frankenberg/de/properties.json` | Deutsch |
| `locales/fritzlar/de/properties.json` | Deutsch |
| `locales/homberg/de/properties.json` | Deutsch |
| `locales/koeln-innenstadt/de/properties.json` | Deutsch |
| `locales/koeln-muelheim/de/properties.json` | Deutsch |
| `locales/korbach/de/properties.json` | Deutsch |
| `locales/moers/de/properties.json` | Deutsch |
| `locales/moers/en/properties.json` | Englisch |
| `locales/moers/fr/properties.json` | Französisch |

**Lösung:** In jede Datei den Schlüssel `"attributionTitle": "Attribution"` ergänzen. Der Wert ist in allen Sprachen identisch, da „Attribution" ein Fachbegriff ohne etablierte Übersetzung ist.

**Akzeptanzkriterium:** Ein `i18next.t('attributionTitle')`-Aufruf gibt in jeder konfigurierten Sprache den Wert `"Attribution"` zurück.

---

#### TASK-007 · Manuelle Abnahme aller Änderungen im Browser

**Prüfpunkte:**

| Nr. | Was prüfen | Erwartet |
|---|---|---|
| 1 | Burger-Menü öffnen | Alle Einträge grau, kein Unterstrich |
| 2 | POI-Marker anklicken | Modal-Titel schwarz, kein `text-primary`-Blau |
| 3 | Dialoge Geschichte, Über das Projekt, Features, QR-Code, Quellen, Attribution öffnen | Kein sichtbarer Rahmen um den Textinhalt |
| 4 | Attribution-Dialog öffnen | Titel „Attribution" sichtbar im Header |
| 5 | Sprache wechseln (sofern mehrere konfiguriert) | Attribution-Titel bleibt „Attribution" |
| 6 | Browser-Konsole | Keine neuen JavaScript-Fehler |
