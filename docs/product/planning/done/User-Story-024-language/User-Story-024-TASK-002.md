# User-Story-024-TASK-002: `assets/js/config.js` — Startsprache-Priorität

## Zugehörige Story
User-Story-024 – Flexible Sprachwahl & Automatik

## Beschreibung
Die Ermittlung der Startsprache (`browserLanguage`) wird auf die neue Prioritätskette
erweitert: **URL-Parameter → `localStorage` → Browser → Fallback `de`**.

Aktuell wird nur geprüft, ob ein `?lng=`-Parameter gesetzt ist, und andernfalls
die Browser-Sprache verwendet. Eine gespeicherte Nutzerauswahl aus `localStorage`
wird noch nicht berücksichtigt.

## Betroffene Datei
- `assets/js/config.js`

---

## Alter Code (zu ersetzen)

```js
let browserLanguage = navigator.language.split('-')[0] || navigator.userLanguage.split('-')[0];
if (getURLParameter('lng')) {
    browserLanguage = getURLParameter('lng');
}
console.log("Browsersprache: ", browserLanguage);
```

---

## Neuer Code

```js
// Startsprache: URL-Parameter → localStorage → Browser → 'de'
let browserLanguage = (function () {
    var urlLng = getURLParameter('lng');
    if (urlLng) return urlLng;
    try {
        var stored = localStorage.getItem('fotopfade_language');
        if (stored) return stored;
    } catch (e) { /* SecurityError in privatem Modus (iOS Safari) — ignorieren */ }
    return (navigator.language || navigator.userLanguage || 'de').split('-')[0];
})();
console.log('Startsprache:', browserLanguage);
```

### Wichtige Punkte
- `getURLParameter` wird per Function-Hoisting vor seiner Textposition aufgerufen — das ist sicher, da es sich um eine Funktionsdeklaration im selben Skript handelt.
- **`localStorage` in try/catch**: In Safari/iOS im privaten Modus und bei bestimmten Browser-Sicherheitseinstellungen wirft `localStorage.getItem()` eine `SecurityError`-Exception. Ohne try/catch würde die App beim Start abstürzen. Der Catch-Block ignoriert den Fehler still — der Nutzer bekommt dann die Browser-Sprache, nicht die gespeicherte.
- URL-Parameter hat höchste Priorität (z. B. für Sharing-Links mit `?lng=en`).
- Der Fallback `de` greift, wenn weder URL-Parameter, noch `localStorage`, noch `navigator.language` einen Wert liefern.
- `navigator.userLanguage` ist ein veraltetes IE-Attribut; es schadet nicht, es als Fallback zu behalten.
