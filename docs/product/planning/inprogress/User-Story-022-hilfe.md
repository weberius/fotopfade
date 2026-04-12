# User Story 022 – Hilfe: Bedienungshinweise über ein Karten-Control

**Als** Nutzer auf der Route  
**möchte ich** die wichtigsten Funktionen der Karte jederzeit auf Knopfdruck erklärt bekommen,  
**damit** ich mich ohne Vorkenntnisse sicher auf der Karte zurechtfinde und nicht zuerst eine Anleitung lesen muss.

---

## Hintergrund & Designentscheidungen

Seit **User Story 021** enthält das `#startModal` keine Navigationshinweise mehr.
Die bisherigen Bedienhinweise (GPS-Standort, Route, Galerie, About) müssen an einem
neuen, jederzeit zugänglichen Ort verfügbar sein.

Die Lösung orientiert sich an den bereits vorhandenen modalen Dialogen der App
(Geschichte, Über das Projekt, Features usw.) und erweitert diese um einen weiteren
Dialog für Bedienungshinweise. Statt eines Eintrags in der Navbar wird ein dezentes
**`?`-Control direkt auf der Karte** platziert, das den Dialog öffnet. Dadurch ist
die Hilfe dort verfügbar, wo der Nutzer sie benötigt – direkt auf der Karte –
ohne die Navbar zu verlängern.

Der Inhalt wird, wie bei allen anderen modalen Dialogen der App,
**extern in einer Markdown-Datei** je Namespace und Sprache gepflegt.
Dies ermöglicht i18n und erlaubt es, bei Bedarf auf Besonderheiten einer Tour
einzugehen. Standardmäßig ist der Inhalt für alle Routen identisch.

---

## Akzeptanzkriterien

### Karten-Control

* Ein benutzerdefiniertes Leaflet-Control mit einem `?`-Button wird der Karte
  an der Position `bottomright` hinzugefügt.
* Das Control erscheint **oberhalb** der Zoom- und GPS-Controls (weiter vom
  unteren Kartenrand entfernt als die übrigen `bottomright`-Controls).
* Das Styling des Buttons folgt dem Leaflet-Standard (`leaflet-bar`), sodass
  er sich optisch an die übrigen Karten-Controls anlehnt.
* Ein Klick auf den Button öffnet den modalen Dialog `#hilfeModalDiv`.
* Klickweitergabe an die Karte wird unterbunden (`L.DomEvent.stopPropagation`).

### Modaler Dialog

* Der Dialog `#hilfeModalDiv` folgt exakt dem Aufbau der bestehenden modalen
  Dialoge der App:
    * **Header**: Titel (`<span id="hilfeModalTitle">`) + `btn-close` (X)
    * **Body**: `<div class="card" id="hilfeModalLi">` – Inhalt wird per
      `ModalBuilder` aus einer Markdown-Datei geladen
    * **Footer**: Sekundärer `btn-secondary`-Button mit
      `<span id="closeBtnHilfeModal">` (verwendet den vorhandenen `closeBtn`-Schlüssel)
* Der Dialog verwendet `modal-lg` (wie Geschichte, Über, Features).
* Der Dialog schließt sich ausschließlich durch explizite Nutzeraktion
  (X-Button oder Schliessen-Button); kein Auto-Close.

### Inhalt (`hilfeModalLi.md`)

Der Standard-Inhalt der Markdown-Datei erklärt die folgenden vier Funktionen:

```markdown
## Bedienungshinweise

- **Pfeil-Symbol (GPS):** Über das Pfeilsymbol können Sie jederzeit Ihre
  Position auf der Karte anzeigen lassen.
- **Route:** „Route" zeigt Entfernungen zwischen den Sehenswürdigkeiten.
- **Über das Projekt:** Unter „Über" finden Sie spannende
  Hintergrundinformationen zum Projekt.
- **Galerie:** In der „Galerie" können Sie ganz in Ruhe durch die
  schönsten Bilder stöbern.
```

### i18n

* `locale.js` – `updateContent()` erhält zwei neue Zeilen:
    * `document.getElementById('hilfeModalTitle').innerHTML = i18next.t('hilfeTitle');`
    * `document.getElementById('closeBtnHilfeModal').innerHTML = i18next.t('closeBtn');`
* `locale.js` – `updateContent()` erhält einen neuen `ModalBuilder`-Aufruf:
    * `new ModalBuilder().loadMarkdown('hilfeModalLi', i18next.language);`
* `properties.json` aller sieben Namespaces erhält den neuen Schlüssel:
    * `"hilfeTitle": "Bedienungshinweise"`
* Die Markdown-Datei `locales/<namespace>/<lng>/hilfeModalLi.md` wird je
  Sprache und Namespace angelegt (Standardinhalt wie oben).
* Routen mit mehreren Sprachen (moers: de / en / fr) erhalten je eine eigene
  Markdown-Datei.

### Betroffene Routen und Sprachen

| Namespace         | Sprachen           | properties.json | hilfeModalLi.md |
|-------------------|--------------------|-----------------|-----------------|
| frankenberg       | de                 | Neu: `hilfeTitle` | de              |
| fritzlar          | de                 | Neu: `hilfeTitle` | de              |
| homberg           | de                 | Neu: `hilfeTitle` | de              |
| koeln-innenstadt  | de                 | Neu: `hilfeTitle` | de              |
| koeln-muelheim    | de                 | Neu: `hilfeTitle` | de              |
| korbach           | de                 | Neu: `hilfeTitle` | de              |
| moers             | de, en, fr         | Neu: `hilfeTitle` | de, en, fr      |

---

## Technische Umsetzung – Übersicht

| Datei | Änderung |
|---|---|
| `index.html` | Neuer modaler Dialog `#hilfeModalDiv` (nach den bestehenden Dialogen) |
| `assets/js/app.js` | Neues `L.Control` (`HelpControl`) mit `position: 'bottomright'`; vor `zoomControl` und `locateControl` zur Karte hinzufügen |
| `assets/js/locale.js` | `updateContent()`: zwei `getElementById`-Zeilen + ein `ModalBuilder`-Aufruf |
| `locales/*/de/properties.json` | Neuer Schlüssel `hilfeTitle` |
| `locales/moers/en/properties.json` | Neuer Schlüssel `hilfeTitle` |
| `locales/moers/fr/properties.json` | Neuer Schlüssel `hilfeTitle` |
| `locales/*/de/hilfeModalLi.md` | Neue Markdown-Datei je Namespace |
| `locales/moers/en/hilfeModalLi.md` | Englische Variante |
| `locales/moers/fr/hilfeModalLi.md` | Französische Variante |

---

## Nicht in Scope

* Kein Navbar-Eintrag für die Hilfe.
* Kein automatisches Einblenden des Hilfe-Dialogs beim ersten Besuch.
* Keine Änderungen am `#startModal`.
