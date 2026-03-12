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

## Alternativen

| Alternative | Bewertung |
|---|---|
| HTML-Fragmente direkt im HTML einbetten | Kein Markdown-Editor nutzbar, Redundanz bei mehreren Sprachen |
| HTML-Fragment-Dateien (`.html`) | Möglich (wird für einige Elemente genutzt), aber weniger redaktionsfreundlich |
| Handlebars-Templates | Bereits in der App vorhanden, aber für Fließtexte ungeeignet |
| CMS-Anbindung | Widerspricht dem statischen Ansatz (ADR-001) |

## Konsequenzen

**Positiv:**
- Inhalte können in jedem Texteditor gepflegt werden
- Trennung von Inhalt und Präsentation
- Neue Sprachversionen durch Anlegen einer neuen `.md`-Datei im passenden Verzeichnis
- Versionierbar via Git

**Negativ:**
- Ein zusätzlicher HTTP-Request pro Modal beim Laden der Seite
- marked.js muss korrekt konfiguriert sein (insb. für eingebettetes HTML)
- Fehlerhafte Pfade führen zu leerem Modal ohne sichtbare Fehlermeldung für den Nutzer
