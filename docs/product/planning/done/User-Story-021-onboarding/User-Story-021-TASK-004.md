# User-Story-021-TASK-004: `assets/js/locale.js` – i18n-Label für CTA-Button setzen

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Das Label `<span id="startTourBtnLabel">` des neuen CTA-Buttons (TASK-002) muss via i18next übersetzt werden, damit es sich bei einem Sprachwechsel automatisch aktualisiert. Die Zuweisung erfolgt in der Funktion `updateContent()` in `locale.js`, die alle anderen UI-Labels ebenfalls setzt. Die Funktion wird beim i18next-Initialisierungs-Callback und bei jedem `changeLanguage()`-Aufruf ausgeführt (vgl. ADR-004, ADR-008).

## Technische Details
- Betroffene Datei: `assets/js/locale.js`
- Einfügeposition: in der Funktion `updateContent()`, im Block der bestehenden `innerHTML`-Zuweisungen
- i18n-Schlüssel: `tourStarten` (wird in TASK-006 in allen `properties.json` ergänzt)

## Einzufügender Code

```js
document.getElementById('startTourBtnLabel').innerHTML = i18next.t('tourStarten');
```

## Kontext (Umgebung der Einfügstelle in `locale.js`)

```js
    document.getElementById('coffeeSelectorSpan').innerHTML = i18next.t('unterstuetzung');
    // ↓ hier einfügen
    document.getElementById('startTourBtnLabel').innerHTML = i18next.t('tourStarten');
    document.getElementById('geschichteModalTitle').innerHTML = i18next.t('geschichteTitle');
```

## Schritte
- [x] `assets/js/locale.js` öffnen
- [x] Zeile mit `coffeeSelectorSpan` aufsuchen
- [x] Neue Zeile für `startTourBtnLabel` unmittelbar darunter einfügen
- [ ] Im Browser prüfen: Button-Label ändert sich beim Sprachwechsel korrekt

## Status
Erledigt

## Aufwand
XS

## Abhängigkeit
TASK-002 (Button im DOM) und TASK-006 (Schlüssel in `properties.json`) müssen abgeschlossen sein
