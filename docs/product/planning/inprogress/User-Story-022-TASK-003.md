# User-Story-022-TASK-003: `assets/js/locale.js` – i18n-Verdrahtung für Hilfe-Dialog

## Zugehörige Story
User-Story-022 – Hilfe: Bedienungshinweise über ein Karten-Control

## Beschreibung
Die Funktion `updateContent()` in `locale.js` muss um drei neue Zeilen ergänzt
werden, damit Titel, Schliessen-Button und Inhalt des Hilfe-Dialogs bei jedem
Sprach-Initialisierungs- und Sprachwechsel-Aufruf korrekt gesetzt werden.

## Technische Details
- Betroffene Datei: `assets/js/locale.js`
- Einfügeposition: in `updateContent()`, im Anschluss an die anderen
  `closeBtnXxx`-Zeilen und vor dem Block der `ModalBuilder`-Aufrufe

## Einzufügende Zeilen

**1. Zwei neue `getElementById`-Zeilen** (nach dem letzten bestehenden
`closeBtnXxxModal`-Eintrag, z. B. nach `closeBtnFeatureModel`):

```js
document.getElementById('hilfeModalTitle').innerHTML = i18next.t('hilfeTitle');
document.getElementById('closeBtnHilfeModal').innerHTML = i18next.t('closeBtn');
```

**2. Ein neuer `ModalBuilder`-Aufruf** (im Block der `ModalBuilder`-Aufrufe,
nach dem bestehenden `loadMarkdown('startModalBody', ...)`-Aufruf):

```js
new ModalBuilder().loadMarkdown('hilfeModalLi', i18next.language);
```

## Kontext – Einfügstelle 1 (`getElementById`-Block)

```js
    document.getElementById('closeBtnLegendModal').innerHTML = i18next.t('closeBtn');
    document.getElementById('closeBtnFeatureModel').innerHTML = i18next.t('closeBtn');
    // ↓ hier einfügen
    document.getElementById('hilfeModalTitle').innerHTML = i18next.t('hilfeTitle');
    document.getElementById('closeBtnHilfeModal').innerHTML = i18next.t('closeBtn');
    document.getElementById('languageSelectorA').innerHTML = i18next.t('language');
```

## Kontext – Einfügstelle 2 (`ModalBuilder`-Block)

```js
    new ModalBuilder().loadMarkdown('startModalBody', i18next.language);
    // ↓ hier einfügen
    new ModalBuilder().loadMarkdown('hilfeModalLi', i18next.language);
    new ModalBuilder().build('leaflet-control-attribution', i18next.language);
```

## Schritte
- [ ] `assets/js/locale.js` öffnen
- [ ] Zeile `closeBtnFeatureModel` aufsuchen → zwei neue Zeilen darunter einfügen
- [ ] Zeile `loadMarkdown('startModalBody', ...)` aufsuchen → neue `ModalBuilder`-Zeile darunter einfügen
- [ ] Im Browser prüfen: Titel „Bedienungshinweise" erscheint im Hilfe-Dialog-Header
- [ ] Im Browser prüfen: Schliessen-Button-Label korrekt übersetzt

## Status
Offen

## Aufwand
XS

## Abhängigkeit
TASK-001 (DOM-Elemente vorhanden), TASK-004 (Schlüssel `hilfeTitle` in `properties.json`),
TASK-005 (Markdown-Datei `hilfeModalLi.md` vorhanden)
