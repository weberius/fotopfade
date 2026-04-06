# ADR-010: Eigenständige modale Dialoge für Projektinhalte statt Tab-Navigation

**Datum:** 2026-04  
**Status:** Vorgeschlagen

---

## Kontext

Die fünf Projektinhalte (Geschichte, Über das Projekt, Features, QR-Code, Quellen) wurden bisher in einem einzigen modalen Dialog (`#aboutModalDiv`) zusammengefasst, der über einen einzigen Burger-Menüeintrag „Das Projekt" (`about-btn`) erreichbar war. Die Inhalte waren über eine Tab-Navigation mit fünf Reitern zugänglich; die Tab-Köpfe wurden dynamisch aus `locales/<namespace>/<lang>/aboutTabsHeader.html` geladen.

Diese Architektur führte zu folgenden Problemen:

- **Indirektion**: Der Nutzer muss nach dem Öffnen des Dialogs einen zweiten Klick auf den gewünschten Tab ausführen.
- **Redundantes HTML-Fragment**: `aboutTabsHeader.html` ist das einzige sprachspezifische HTML-Fragment, das ausschließlich Tab-Navigation kodiert. Die Tab-Beschriftungen sind i18n-Inhalte, die besser über `properties.json` verwaltet werden.
- **Namespace-Intransparenz**: Nicht alle Fotopfade haben sinnvolle Inhalte für alle fünf Kategorien; das Tab-Modal zeigt immer fünf Reiter, auch wenn einzelne Tabs inhaltlich leer bleiben.
- **Kopplung von Inhalten**: Alle fünf Inhalte werden in einem Modal gebündelt, obwohl sie thematisch unabhängig sind und unterschiedliche Größen haben.

## Entscheidung

Die fünf Projektinhalte werden als **fünf eigenständige modale Dialoge** realisiert, die direkt und gleichrangig über das Burger-Menü erreichbar sind:

| Menüeintrag | Button-ID | Modal-ID |
|---|---|---|
| Geschichte | `geschichte-btn` | `geschichteModalDiv` |
| Über das Projekt | `ueber-btn` | `ueberModalDiv` |
| Features | `features-btn` | `featuresModalDiv` |
| QR-Code | `links-btn` | `linksModalDiv` |
| Quellen | `resources-btn` | `resourcesModalDiv` |

Die Inhalte der Dialoge werden weiterhin per `ModalBuilder.loadMarkdown()` aus den bestehenden Locale-Markdown-Dateien geladen (keine Änderung an ADR-005). Die Menübezeichnungen und Modal-Titel werden über `properties.json` lokalisiert (konsistent mit ADR-004). Das HTML-Fragment `aboutTabsHeader.html` und das zugehörige `ModalBuilder.build()`-Laden in `updateContent()` entfallen.

## Alternativen

| Alternative | Bewertung |
|---|---|
| Tab-Navigation behalten, aber Tabs in `properties.json` konfigurieren | Reduziert HTML-Fragment-Dateien, löst aber nicht das Navigationsproblem (zwei Klicks) |
| Accordion statt Tabs im gemeinsamen Modal | Bessere Mobilansicht, aber alle Inhalte weiterhin in einem Modal gebündelt; Burger-Menü bleibt einträglich |
| Separater Sub-Menü-Punkt „Das Projekt" mit Dropdown | Würde Bootstrap-Dropdown-Logik in den Navbar-Handler einführen; erhöhte Komplexität ohne Mehrwert gegenüber flachen Menüeinträgen |
| Separate HTML-Seiten pro Inhalt | Widerspricht dem SPA-Ansatz (ADR-001) |

## Konsequenzen

**Positiv:**
- Direktnavigation: jeder Inhalt ist in einem Klick erreichbar
- Das HTML-Fragment `aboutTabsHeader.html` (9 Dateien) und das Tab-Container-HTML in `index.html` entfallen
- `ModalBuilder.build()` wird nicht mehr für Projektinhalte benötigt; der Mechanismus bleibt für `routModalBody.html` und `leaflet-control-attribution.html` erhalten
- Neue i18n-Schlüssel sind sprechend und klar pro Dialog benannt
- Das Burger-Menü wächst um vier Einträge; auf kleinen Mobilgeräten kann die Menülänge wahrgenommen werden

**Negativ:**
- Mehr Menüeinträge (5 statt 1) erhöhen die visuelle Länge des Burger-Menüs
- Fünf separate Modals statt eines gemeinsamen erhöhen das HTML-Volumen in `index.html` moderat
- `properties.json` wächst um 10 Schlüssel pro Locale

## Beziehung zu anderen ADRs

| ADR | Beziehung |
|---|---|
| ADR-001 | Kein Widerspruch; alle neuen Dialoge sind statisch in `index.html` |
| ADR-004 | Neue i18n-Schlüssel nutzen den bestehenden i18next-Mechanismus |
| ADR-005 | Das HTML-Fragment `aboutTabsHeader.html` entfällt; Markdown-Laden per `loadMarkdown()` bleibt unverändert |
| ADR-008 | `ModalBuilder.build()` wird für Projektinhalte nicht mehr eingesetzt; ADR-008-Beispieltabelle wird bereinigt (TASK-009) |
