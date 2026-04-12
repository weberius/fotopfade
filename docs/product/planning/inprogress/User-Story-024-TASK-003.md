# User-Story-024-TASK-003: `assets/js/locale.js` — LanguageSelector & changeLanguage anpassen

## Zugehörige Story
User-Story-024 – Flexible Sprachwahl & Automatik

## Beschreibung
Drei Anpassungen in `locale.js`:

1. **`updateContent()`**: Die Zeile, die `#languageSelectorA` (den alten „Sprache"-Span
   im Burger-Menü) setzt, wird entfernt (Element existiert nach TASK-001 nicht mehr).
   Stattdessen wird `#lang-btn-label` mit dem aktuellen Sprachkürzel in Großbuchstaben
   befüllt.

2. **`LanguageSelector.build()`**: Die generierten Dropdown-Einträge enthielten
   `data-bs-toggle="collapse" data-bs-target="#navbarMenu"`, um das Burger-Menü zu
   schließen. Da der Sprachbutton nun außerhalb des Collapse-Menüs sitzt, entfällt
   dieses Attribut. Der onclick-Handler `changeLanguage()` bleibt unverändert.

3. **`changeLanguage()`**: Nach dem erfolgreichen Sprachwechsel wird die Auswahl
   unter dem Schlüssel `fotopfade_language` in `localStorage` gespeichert, damit
   sie beim nächsten Seitenaufruf erhalten bleibt (AC-3).

## Betroffene Datei
- `assets/js/locale.js`

---

## Änderung 1 — `updateContent()`: alten Span entfernen, neuen Header-Button befüllen

### Alter Code

```js
    document.getElementById('languageSelectorA').innerHTML = i18next.t('language');
    document.getElementById('zoomSelectorSpan').innerHTML = i18next.t('zoom');
```

### Neuer Code

```js
    document.getElementById('lang-btn-label').textContent = (i18next.language || 'de').split('-')[0].toUpperCase();
    document.getElementById('zoomSelectorSpan').innerHTML = i18next.t('zoom');
```

---

## Änderung 2 — `LanguageSelector.build()`: `data-bs-toggle/target` entfernen

### Alter Code

```js
    build(newLanguage, existingLanguage) {

        var newLi, targetElement, lng;
        lng = i18next.t(newLanguage);
        newLi = document.createElement('li');
        if (newLanguage === existingLanguage) {
          newLi.innerHTML = '<a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" onclick="changeLanguage(event, \'' + newLanguage + '\')"><i class="bi bi-translate"></i>&nbsp;&nbsp;<i>' + lng + '</i></a>';
        } else {
          newLi.innerHTML = '<a href="#" data-bs-toggle="collapse" data-bs-target="#navbarMenu" onclick="changeLanguage(event, \'' + newLanguage + '\')"><i class="bi bi-translate"></i>&nbsp;&nbsp;' + lng + '</a>';
        }
        targetElement = document.getElementById('languageSelectorUl');
        targetElement.appendChild(newLi);
    }
```

### Neuer Code

```js
    build(newLanguage, existingLanguage) {

        var newLi, targetElement, lng;
        lng = i18next.t(newLanguage);
        newLi = document.createElement('li');
        if (newLanguage === existingLanguage) {
          newLi.innerHTML = '<a href="#" class="dropdown-item active" onclick="changeLanguage(event, \'' + newLanguage + '\')"><i class="bi bi-translate"></i>&nbsp;&nbsp;<i>' + lng + '</i></a>';
        } else {
          newLi.innerHTML = '<a href="#" class="dropdown-item" onclick="changeLanguage(event, \'' + newLanguage + '\')"><i class="bi bi-translate"></i>&nbsp;&nbsp;' + lng + '</a>';
        }
        targetElement = document.getElementById('languageSelectorUl');
        targetElement.appendChild(newLi);
    }
```

**Hinweis:** Zusätzlich wird `class="dropdown-item"` ergänzt, damit Bootstrap das
Dropdown-Menü korrekt stylt. Ohne diese Klasse erscheinen die Einträge als ungestylte
Links (Bootstrap 5 erwartet `dropdown-item` auf den `<a>`-Elementen).

---

## Änderung 3 — `changeLanguage()`: `localStorage` befüllen

### Alter Code

```js
function changeLanguage(event, language) {
    event.preventDefault();
    i18next.changeLanguage(language, (err, t) => {
        if (err) {
            return console.error('Error changing language:', err);
        }
        languageCode = i18next.language;
        updateContent();
//        console.log('Sprache geändert auf:', languageCode);
    });
}
```

### Neuer Code

```js
function changeLanguage(event, language) {
    event.preventDefault();
    i18next.changeLanguage(language, (err, t) => {
        if (err) {
            return console.error('Error changing language:', err);
        }
        try { localStorage.setItem('fotopfade_language', language); } catch (e) { /* privater Modus */ }
        languageCode = i18next.language.split('-')[0];
        updateContent();
    });
}
```

**Bugfix `languageCode`:** Der Init-Callback setzt korrekt `languageCode = i18next.language.split('-')[0]` (z.B. `de` aus `de-DE`). Der alte `changeLanguage()` setzte `languageCode = i18next.language` **ohne** `.split('-')[0]`. Nach einem Sprachwechsel hätte `languageCode` den Wert `de-DE` statt `de` — alle `locales/<namespace>/<lang>/`-Pfade in `app.js` würden 404 liefern.

**`localStorage` in try/catch:** Konsistent mit TASK-002 — `setItem` wirft in Safari/iOS im privaten Modus eine `SecurityError`-Exception. Der Catch-Block ignoriert still; die Sprachauswahl gilt für die aktuelle Sitzung, wird aber nicht gespeichert.
