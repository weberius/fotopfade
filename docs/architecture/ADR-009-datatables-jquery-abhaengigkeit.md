# ADR-009: DataTables CDN-Build erfordert jQuery als Peer-Abhängigkeit

**Datum:** 2026-04  
**Status:** Akzeptiert

---

## Kontext

Im Zuge der Bootstrap-5-Migration (User-Story-010) wurde jQuery aus `index.html` entfernt, da
Bootstrap 5 jQuery nicht mehr benötigt und `app.js` vollständig auf native Browser-APIs umgestellt
wurde. Die App nutzt DataTables 2.0.3 für die Etappentabelle im Routen-Modal (`#legendModal`).

DataTables wird über den offiziellen CDN bezogen:

```
https://cdn.datatables.net/2.0.3/js/dataTables.min.js
```

Bei der Initialisierung der Tabelle nach der jQuery-Entfernung erschien folgender Fehler in der
Browser-Konsole:

```
Uncaught ReferenceError: DataTable is not defined
```

**Ursache:** Der CDN-Build von DataTables 2.0.3 verwendet den folgenden Eintrittspunkt:

```javascript
window.DataTable = n(jQuery, window, document);
```

Das Build-Artefakt auf `cdn.datatables.net` ist eine jQuery-gebundene Variante. Fehlt `jQuery` als
globale Variable, schlägt die Factory-Funktion lautlos fehl und `window.DataTable` bleibt
`undefined`. Eine jQuery-freie UMD-Build ist über diesen CDN-Endpunkt nicht verfügbar.

## Entscheidung

jQuery wird als **reine Peer-Abhängigkeit für DataTables** wieder in `index.html` eingebunden.
Die Einbindung erfolgt **nach** dem Bootstrap-Bundle und **vor** DataTables:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.datatables.net/2.0.3/js/dataTables.min.js"></script>
```

Die übrige Anwendungslogik (`app.js`, `locale.js`) verwendet kein jQuery; alle Event-Handler,
DOM-Manipulation und AJAX-Aufrufe sind nativ in Vanilla JS implementiert.

Zusätzlich wird die DataTable-Initialisierung auf das `shown.bs.modal`-Event des `#legendModal`
verschoben. Grund: DataTables berechnet Spaltenbreiten anhand der tatsächlich gerenderten
Tabellenbreite. Wird die Tabelle initialisiert, bevor das Modal vollständig eingeblendet ist
(`display: block`, Transition abgeschlossen), erhält DataTables falsche Maße und zeigt die
Tabelle fehlerhaft an. Das `shown.bs.modal`-Event von Bootstrap 5 wird erst nach dem Ende
der Einblend-Animation ausgelöst.

Die Initialisierung wird ausschließlich beim ersten Öffnen des Modals durchgeführt
(Flag `legendTableInitialized`).

## Alternativen

| Alternative | Bewertung |
|---|---|
| DataTables-NPM-Build selbst hosten (jQuery-frei) | Erfordert lokale Kopie oder Build-Pipeline; widerspricht dem CDN-only-Ansatz der App |
| Auf DataTables verzichten, native HTML-Tabelle | Kein async AJAX-Laden der JSON-Daten; manuelle Tabellenaufbau-Logik notwendig |
| Auf eine andere Tabellenbibliothek wechseln (z. B. Tabulator) | Migration der Datenstruktur notwendig; Mehraufwand ohne klaren Mehrwert |
| cdn.datatables.net-Version auf 1.x downgraden | ältere Maintainance-Phase; keine langfristige Lösung |

## Konsequenzen

**Positiv:**
- DataTables funktioniert korrekt ohne lokale Abhängigkeiten
- Kein Build-Schritt notwendig
- jQuery wird **ausschließlich** als Peer-Abhängigkeit von DataTables geladen;
  die Anwendungslogik bleibt jQuery-frei
- Die verzögerte Initialisierung (`shown.bs.modal`) verhindert fehlerhafte Spaltenberechnung

**Negativ:**
- jQuery (ca. 90 KB minimiert) bleibt als Ladeabhängigkeit erhalten, obwohl es nur als
  DataTables-Peer verwendet wird
- Ohne jQuery-Upgrade bleibt diese Abhängigkeit bestehen, solange DataTables vom
  jquery-gebundenen CDN-Build geladen wird
- Wechsel auf den jQuery-freien Build erfordert selbst gehostetes Artefakt

## Verweis

- ADR-001: Statische SPA ohne Backend – CDN-only-Ansatz
- ADR-006: JSON als Datenformat für Etappendaten (`service/data/<namespace>.json`)
