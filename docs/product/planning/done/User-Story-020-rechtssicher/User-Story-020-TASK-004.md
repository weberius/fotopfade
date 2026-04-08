# User-Story-020-TASK-004: i18n – Schlüssel für Navbar-Eintrag „Unterstützung" ergänzen

## Zugehörige Story
User-Story-020 – Rechtssicherheit & Unterstützung

## Beschreibung
Der neue Navbar-Eintrag nutzt eine i18n-fähige `<span id="coffeeSelectorSpan">`. Damit die Beschriftung beim Sprachenwechsel korrekt aktualisiert wird, müssen zwei Dinge ergänzt werden:

1. Der i18n-Schlüssel `"unterstuetzung"` in allen `properties.json`-Dateien
2. Die Zuweisung `coffeeSelectorSpan` in der Funktion `updateContent()` in `assets/js/locale.js`

**Hinweis zur Key-Namenskonvention:** Alle bestehenden i18n-Keys sind ASCII ohne Umlaute (`"ueber"` statt `"über"`, `"geschichte"` ohne Großschreibung). Der Key lautet daher `"unterstuetzung"` (ü → ue).

## Technische Details

### Betroffene Locale-Dateien (alle `properties.json`)
- `locales/frankenberg/de/properties.json`
- `locales/fritzlar/de/properties.json`
- `locales/homberg/de/properties.json`
- `locales/koeln-innenstadt/de/properties.json`
- `locales/koeln-muelheim/de/properties.json`
- `locales/korbach/de/properties.json`
- `locales/moers/de/properties.json`
- `locales/moers/en/properties.json`
- `locales/moers/fr/properties.json`

### Zu ergänzender Schlüssel in jeder `properties.json`

Alle deutschen Locales (`de`):
```json
"unterstuetzung": "Unterstützung"
```

Englisch (`moers/en`):
```json
"unterstuetzung": "Support"
```

Französisch (`moers/fr`):
```json
"unterstuetzung": "Soutien"
```

### Betroffene Datei: `assets/js/locale.js`

In `updateContent()` nach dem letzten `SelectorSpan`-Eintrag einfügen:

```js
// vorher: letzter SelectorSpan-Eintrag
document.getElementById('resourcesSelectorSpan').innerHTML = i18next.t('resources');
```

```js
// nachher
document.getElementById('resourcesSelectorSpan').innerHTML = i18next.t('resources');
document.getElementById('coffeeSelectorSpan').innerHTML = i18next.t('unterstuetzung');
```

## Schritte
- [x] Alle 9 `properties.json`-Dateien öffnen und `"unterstuetzung"`-Schlüssel ergänzen
- [x] `assets/js/locale.js` öffnen und Zeile für `coffeeSelectorSpan` in `updateContent()` einfügen
- [ ] Im Browser prüfen: Sprachenwechsel aktualisiert die Beschriftung des Navbar-Eintrags korrekt

## Status
Erledigt

## Aufwand
S

## Abhängigkeit
Setzt TASK-001 voraus.
