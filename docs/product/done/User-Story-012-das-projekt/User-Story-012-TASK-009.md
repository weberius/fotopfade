# User-Story-012-TASK-009: ADR-005 und ADR-008 – `aboutTabsHeader.html`-Referenzen entfernen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Zwei Architekturentscheidungsdokumente (ADRs) nennen `aboutTabsHeader.html` explizit in Beispieltabellen. Nach TASK-007 existiert diese Datei nicht mehr, und das Konzept „HTML-Fragment für Tab-Navigation" entfällt vollständig. Beide ADRs müssen bereinigt werden, damit sie den tatsächlichen Architekturzustand widerspiegeln.

## Technische Details
- Betroffene Dateien:
  - `docs/architecture/ADR-005-markdown-modal-inhalte.md`
  - `docs/architecture/ADR-008-locale-fragment-loading.md`

---

## Änderung 1: ADR-005 – Tabelle der HTML-Fragmente aktualisieren

**Zu ändernde Tabelle** (Abschnitt „Ergänzung: HTML-Fragmente für strukturelle UI-Elemente"):

```markdown
<!-- vorher -->
| Dateiname | Ziel-Element-ID | Inhalt |
|---|---|---|
| `aboutTabsHeader.html` | `aboutTabsHeader` | Tab-Navigation des About-Modals (`<li>` mit `data-toggle="tab"`) |
| `routModalBody.html` | `routModalBody` | DataTables-Tabelle für die Routenübersicht |
| `leaflet-control-attribution.html` | Leaflet-Control-DIV | Attributionszeile unten rechts auf der Karte |
```

```markdown
<!-- nachher: aboutTabsHeader.html entfernen -->
| Dateiname | Ziel-Element-ID | Inhalt |
|---|---|---|
| `routModalBody.html` | `routModalBody` | DataTables-Tabelle für die Routenübersicht |
| `leaflet-control-attribution.html` | Leaflet-Control-DIV | Attributionszeile unten rechts auf der Karte |
```

---

## Änderung 2: ADR-008 – Beispieltabelle in „HTML-Fragmente vs. Markdown-Fragmente" aktualisieren

**Zu ändernde Zeile** (Tabelle im Abschnitt „HTML-Fragmente vs. Markdown-Fragmente"):

```markdown
<!-- vorher -->
| Beispiele | `aboutTabsHeader.html`, `routModalBody.html`, `leaflet-control-attribution.html` | `startModalBody.md`, `p1.md`, `impressumModalLi.md` |
```

```markdown
<!-- nachher -->
| Beispiele | `routModalBody.html`, `leaflet-control-attribution.html` | `startModalBody.md`, `p1.md`, `impressumModalLi.md` |
```

---

## Schritte
- [ ] `docs/architecture/ADR-005-markdown-modal-inhalte.md` öffnen
- [ ] Zeile `aboutTabsHeader.html` aus der HTML-Fragmente-Tabelle entfernen
- [ ] `docs/architecture/ADR-008-locale-fragment-loading.md` öffnen
- [ ] `aboutTabsHeader.html` aus der Beispielspalte der Vergleichstabelle entfernen
- [ ] Prüfen: Kein Vorkommen von `aboutTabsHeader` in den ADR-Dateien mehr vorhanden

## Reihenfolge
Dieser Task sollte **nach TASK-007** (Löschen der `aboutTabsHeader.html`-Dateien) ausgeführt werden, damit ADRs und Implementierung synchron gehalten werden.

## Ergebnis
ADR-005 und ADR-008 enthalten keine Referenzen mehr auf das entfernte `aboutTabsHeader.html`. Die ADR-Tabellen spiegeln die verbleibenden HTML-Fragmente (`routModalBody.html`, `leaflet-control-attribution.html`) korrekt wider.

## Status
Offen

## Aufwand
XS
