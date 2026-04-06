# ADR-005: Markdown-Dateien für modale Dialoginhalte

**Datum:** 2024  
**Status:** Akzeptiert

---

## Kontext

Mehrere modale Dialoge der App (Über die App, Impressum, Disclaimer, Datenschutz, Unterstützung, POI-Beschreibungen) enthalten längere, formatierte Texte, die:

- sprachabhängig sind,
- pro Fotopfad unterschiedlich sein können,
- von Redakteuren ohne HTML-Kenntnisse pflegbar sein sollen.

## Entscheidung

Alle umfangreicheren Inhalte werden als **Markdown-Dateien** (`*.md`) abgelegt. Die Pfadstruktur lautet:

```
locales/<namespace>/<lang>/<dateiname>.md
```

Beim Laden wird die Markdown-Datei per `fetch` abgerufen und mit [marked.js](https://marked.js.org/) in HTML konvertiert. Das resultierende HTML wird per `innerHTML` in das DOM-Element des jeweiligen Modals injiziert.

Die Klasse `ModalBuilder` (in `app.js`) kapselt diesen Mechanismus in der Methode `loadMarkdown(elementId, lang, fileName)`.

**Wichtiger Hinweis für HTML-Einbettung:** Inline-Elemente wie `<a>` müssen in ein Block-Element (`<p>`) eingeschlossen werden, damit marked.js sie als rohen HTML-Block und nicht als Code rendert.

## Ergänzung: HTML-Fragmente für strukturelle UI-Elemente

Neben Markdown-Dateien werden im selben Verzeichnisschema (`locales/<namespace>/<lang>/`) auch **HTML-Fragment-Dateien** (`.html`) eingesetzt. Diese dienen strukturellen UI-Elementen, bei denen HTML-Markup direkt benötigt wird und kein Markdown-Umweg sinnvoll ist.

Aktuell verwendete HTML-Fragmente:

| Dateiname | Ziel-Element-ID | Inhalt |
|---|---|---|
| `aboutTabsHeader.html` | `aboutTabsHeader` | Tab-Navigation des About-Modals (`<li>` mit `data-toggle="tab"`) |
| `routModalBody.html` | `routModalBody` | DataTables-Tabelle für die Routenübersicht |
| `leaflet-control-attribution.html` | Leaflet-Control-DIV | Attributionszeile unten rechts auf der Karte |

Diese werden über die Methode `ModalBuilder.build(elementId, lang)` aus `assets/js/app.js` bedarfsgesteuert geladen (Lazy Loading per `fetch()`). Das zurückgegebene HTML wird direkt per `element.innerHTML = htmlFragment` in das DOM injiziert.

## Bedarfsgesteuertes Laden (Lazy Loading) aller Locale-Fragmente

Sowohl `.md`- als auch `.html`-Fragmente werden **nicht beim initalen Seitenaufruf gebündelt** geladen, sondern **erst bei Bedarf** — d. h. wenn `updateContent()` nach erfolgreicher i18next-Initialisierung aufgerufen wird. Das konkrete Ladeverhalten:

1. `DOMContentLoaded` → i18next initialisiert sich und lädt `properties.json`
2. i18next-Callback ruft `updateContent()` auf
3. `updateContent()` ruft für jedes Modal/UI-Element entweder `ModalBuilder.build()` oder `ModalBuilder.loadMarkdown()` auf
4. Jede Methode sendet einen eigenen `fetch()`-Request an den jeweiligen Pfad
5. Bei erfolgreicher Antwort wird das Fragment per `innerHTML` in das Ziel-DOM-Element injiziert
6. Bei Fehler (404, Netzwerkfehler) bleibt das Ziel-Element **leer** — kein sichtbarer Fehler für den Nutzer, aber ein Konsolenlog-Eintrag

POI-Beschreibungen (`.md`) werden bereits beim Aufbau des POI-Layers per `onEachFeature` für jeden einzelnen POI asynchron vorab geladen und bei Klick auf den Marker ins featureModal injiziert.

## Alternativen

| Alternative | Bewertung |
|---|---|
| HTML-Fragmente direkt im HTML einbetten | Kein Markdown-Editor nutzbar, Redundanz bei mehreren Sprachen |
| HTML-Fragment-Dateien (`.html`) | Wird ergänzend für strukturelle Elemente (Tabs, Tabellen) genutzt — kein Markdown-Overhead |
| Handlebars-Templates | Bereits in der App vorhanden, aber für Fließtexte ungeeignet |
| CMS-Anbindung | Widerspricht dem statischen Ansatz (ADR-001) |

## Konsequenzen

**Positiv:**
- Inhalte können in jedem Texteditor gepflegt werden
- Trennung von Inhalt und Präsentation
- Neue Sprachversionen durch Anlegen einer neuen `.md`-Datei im passenden Verzeichnis
- Strukturelle UI-Teile mit HTML-Fragmenten realisierbar ohne Markdown-Umweg
- Versionierbar via Git

**Negativ:**
- Ein zusätzlicher HTTP-Request pro Modal und POI beim Laden der Seite
- marked.js muss korrekt konfiguriert sein (insb. für eingebettetes HTML)
- Fehlerhafte Pfade führen zu leerem Modal ohne sichtbare Fehlermeldung für den Nutzer
- Zwei Dateiformate (`.md`, `.html`) erfordern unterschiedliche Pflegeprozesse
