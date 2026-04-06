# User-Story-012-TASK-007: `locales/**/aboutTabsHeader.html` – Dateien in allen Locale-Verzeichnissen löschen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Nach Abschluss von TASK-005 wird `aboutTabsHeader.html` nicht mehr benötigt: Der `ModalBuilder`-Aufruf für dieses Fragment ist entfernt, und das Tab-Modal `#aboutModalDiv` existiert nicht mehr. Die Fragmentdateien werden daher in allen Locale-Verzeichnissen gelöscht.

## Technische Details
- Betroffene Dateien (9 Dateien):

| Datei |
|---|
| `locales/frankenberg/de/aboutTabsHeader.html` |
| `locales/fritzlar/de/aboutTabsHeader.html` |
| `locales/homberg/de/aboutTabsHeader.html` |
| `locales/koeln-innenstadt/de/aboutTabsHeader.html` |
| `locales/koeln-muelheim/de/aboutTabsHeader.html` |
| `locales/korbach/de/aboutTabsHeader.html` |
| `locales/moers/de/aboutTabsHeader.html` |
| `locales/moers/en/aboutTabsHeader.html` |
| `locales/moers/fr/aboutTabsHeader.html` |

## Inhalt der zu löschenden Dateien (Beispiel: `koeln-muelheim/de`)

```html
<li class="active"><a href="#expectModal" data-toggle="tab"><i class="bi bi-person-check"></i>&nbsp;Geschichte</a></li>
<li><a href="#aboutModal" data-toggle="tab"><i class="bi bi-question-circle"></i>&nbsp;Über das Projekt</a></li>
<li><a href="#featuresModal" data-toggle="tab"><i class="bi bi-ui-checks"></i>&nbsp;Features</a></li>
<li><a href="#linksModal" data-toggle="tab"><i class="bi bi-bookmark-star"></i>&nbsp;QR-Code</a></li>
<li><a href="#resourcesModal" data-toggle="tab"><i class="bi bi-exclamation-circle"></i>&nbsp;Quellen</a></li>
```

## Schritte
- [ ] Alle 9 `aboutTabsHeader.html`-Dateien löschen:
  ```
  rm locales/frankenberg/de/aboutTabsHeader.html
  rm locales/fritzlar/de/aboutTabsHeader.html
  rm locales/homberg/de/aboutTabsHeader.html
  rm locales/koeln-innenstadt/de/aboutTabsHeader.html
  rm locales/koeln-muelheim/de/aboutTabsHeader.html
  rm locales/korbach/de/aboutTabsHeader.html
  rm locales/moers/de/aboutTabsHeader.html
  rm locales/moers/en/aboutTabsHeader.html
  rm locales/moers/fr/aboutTabsHeader.html
  ```
- [ ] Prüfen: Keine `aboutTabsHeader.html`-Datei mehr in den Locale-Verzeichnissen vorhanden
- [ ] Prüfen: Der Browser-Netzwerk-Tab zeigt nach der Änderung keinen fehlgeschlagenen Fetch-Versuch für `aboutTabsHeader.html`

## Reihenfolge
Dieser Task muss **nach TASK-005** ausgeführt werden (nach dem Entfernen des `ModalBuilder`-Aufrufs für `aboutTabsHeader` in `locale.js`).

## Ergebnis
Keine ungenutzten `aboutTabsHeader.html`-Fragmente mehr in den Locale-Verzeichnissen.

## Status
Offen

## Aufwand
XS
