# User-Story-012-TASK-005: `assets/js/locale.js` – `updateContent()` auf 5 eigenständige Modals umstellen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
In `locale.js` die Funktion `updateContent()` auf die neuen Strukturen umstellen:
1. `aboutSelectorSpan` durch fünf neue Span-IDs für die Menüeinträge ersetzen
2. `welcomeModelTitle` und `closeBtnAboutModal` durch fünf neue Modal-Titel- und Schließen-Button-Spans ersetzen
3. Den `ModalBuilder`-Aufruf für `aboutTabsHeader` entfernen
4. Die Card-IDs der `ModalBuilder.loadMarkdown()`-Aufrufe bleiben unverändert (die IDs `expectModalLi`, `aboutModalLi`, etc. werden in den neuen Modals weiter verwendet)

## Technische Details
- Betroffene Datei: `assets/js/locale.js`
- Betroffene Zeilen: 45, 51–54, 58, 61–62

## Zu ändernde Code-Stellen

### Änderung 1 – `closeBtnAboutModal` ersetzen (Zeile 45)

```js
// vorher
document.getElementById('closeBtnAboutModal').innerHTML = i18next.t('closeBtn');
```

```js
// nachher: fünf Close-Button-Spans für die neuen Modals
document.getElementById('closeBtnGeschichteModal').innerHTML = i18next.t('closeBtn');
document.getElementById('closeBtnUeberModal').innerHTML = i18next.t('closeBtn');
document.getElementById('closeBtnFeaturesModal').innerHTML = i18next.t('closeBtn');
document.getElementById('closeBtnLinksModal').innerHTML = i18next.t('closeBtn');
document.getElementById('closeBtnResourcesModal').innerHTML = i18next.t('closeBtn');
```

### Änderung 2 – `aboutSelectorSpan` und `welcomeModelTitle` ersetzen (Zeilen 51–53)

```js
// vorher
document.getElementById('aboutSelectorSpan').innerHTML = i18next.t('about');
document.getElementById('welcomeModelTitle').innerHTML = i18next.t('welcomeModelTitle');
```

```js
// nachher: Menüeintrags-Spans und Modal-Titel-Spans lokalisieren
document.getElementById('geschichteSelectorSpan').innerHTML = i18next.t('geschichte');
document.getElementById('ueberSelectorSpan').innerHTML = i18next.t('ueber');
document.getElementById('featuresSelectorSpan').innerHTML = i18next.t('features');
document.getElementById('linksSelectorSpan').innerHTML = i18next.t('links');
document.getElementById('resourcesSelectorSpan').innerHTML = i18next.t('resources');
document.getElementById('geschichteModalTitle').innerHTML = i18next.t('geschichteTitle');
document.getElementById('ueberModalTitle').innerHTML = i18next.t('ueberTitle');
document.getElementById('featuresModalTitle').innerHTML = i18next.t('featuresTitle');
document.getElementById('linksModalTitle').innerHTML = i18next.t('linksTitle');
document.getElementById('resourcesModalTitle').innerHTML = i18next.t('resourcesTitle');
```

### Änderung 3 – `ModalBuilder`-Aufruf für `aboutTabsHeader` entfernen (Zeile 54)

```js
// vorher
new ModalBuilder().build('aboutTabsHeader', i18next.language);
```

```js
// nachher: Zeile vollständig entfernen
```

> **Hinweis:** Die `ModalBuilder.loadMarkdown()`-Aufrufe für die fünf Inhalts-Cards (`resourcesModalLi`, `featuresModalLi`, `linksModalLi`, `expectModalLi`, `aboutModalLi`) bleiben **unverändert**, da die Card-IDs in den neuen eigenständigen Modals dieselben geblieben sind (vgl. TASK-003).

## Schritte
- [ ] `assets/js/locale.js` öffnen
- [ ] Zeile `closeBtnAboutModal` durch fünf neue `closeBtnXxxModal`-Zeilen ersetzen
- [ ] Zeile `aboutSelectorSpan` durch fünf `xxxSelectorSpan`-Zeilen ersetzen
- [ ] Zeile `welcomeModelTitle` durch fünf `xxxModalTitle`-Zeilen ersetzen
- [ ] Zeile `new ModalBuilder().build('aboutTabsHeader', ...)` entfernen
- [ ] Prüfen: Keine Referenz auf `aboutSelectorSpan`, `welcomeModelTitle`, `closeBtnAboutModal` oder `aboutTabsHeader` mehr vorhanden
- [ ] Prüfen: Alle zehn neuen Span-IDs werden korrekt angesprochen

## Reihenfolge
Dieser Task setzt **TASK-002** (Entfernung von `#aboutModalDiv` inkl. `#welcomeModelTitle`) und **TASK-003** (neue Span-IDs in `index.html`) voraus. Erst wenn beide abgeschlossen sind, findet `getElementById` alle neuen Spans und findet `#welcomeModelTitle` nicht mehr (kein `null`-Fehler). Dieser Task muss **vor TASK-007** abgeschlossen sein.

## Ergebnis
`updateContent()` lokalisiert alle neuen Menüeintrags-Spans und Modal-Titel korrekt; der obsolete Tab-Header-Aufruf ist entfernt.

## Status
Offen

## Aufwand
S
