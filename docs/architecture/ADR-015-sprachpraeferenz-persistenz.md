# ADR-015: Sprachpräferenz-Persistenz via localStorage

**Datum:** 2026-04  
**Status:** Akzeptiert  
**Umgesetzt in:** User-Story-024

---

## Kontext

Die App i18next-Spracherkennung (ADR-004) bestimmt die Startsprache aus der
Browser-Systemsprache. Bei Nutzern, deren Gerät auf `de` eingestellt ist, die
aber eine mehrsprachige Route (z.B. `moers`) auf Englisch lesen wollen, muss
die manuelle Auswahl bei jedem Seitenaufruf neu getroffen werden.

Die App ist vollständig statisch (kein Backend, kein Session-Cookie-Mechanismus
— ADR-001). Als clientseitiger Persistenzmechanismus steht `localStorage` zur
Verfügung.

---

## Entscheidung

Die manuelle Sprachauswahl des Nutzers wird unter dem Schlüssel
`fotopfade_language` in `localStorage` gespeichert.

### Startsprache-Priorität

Die Startsprache wird in `assets/js/config.js` nach folgender Reihenfolge
ermittelt (höhere Zahl = niedrigere Priorität):

| Priorität | Quelle | Beispiel | Verwendungszweck |
|---|---|---|---|
| 1 | URL-Parameter `?lng=` | `?lng=en` | Sharing-Links, direkte Verlinkung |
| 2 | `localStorage['fotopfade_language']` | `en` | Gespeicherte Nutzerpräferenz |
| 3 | `navigator.language` | `de-DE` → `de` | Browser-/OS-Systemsprache |
| 4 | Fallback `de` | — | Wenn alle anderen Quellen fehlen |

### localStorage-Schlüssel

```
Schlüssel:  fotopfade_language
Wert:       ISO-639-1-Sprachcode, zweistellig, Kleinbuchstaben (z.B. "de", "en", "fr")
Scope:      Origin (domainweit, nicht auf einzelne Routen beschränkt)
```

### Schreiben

Der Wert wird **nur bei manueller Auswahl** über `changeLanguage()` geschrieben,
nicht bei der automatischen Erkennung beim Start.

### Fehlerbehandlung

In Browsern im privaten Modus (Safari/iOS) und bei restriktiven
Sicherheitseinstellungen kann `localStorage` eine `SecurityError`-Exception
werfen. Alle `localStorage`-Zugriffe sind daher in `try/catch` gekapselt:

```js
// Lesen
try {
    var stored = localStorage.getItem('fotopfade_language');
    if (stored) return stored;
} catch (e) { /* ignorieren — Fallback greift */ }

// Schreiben
try { localStorage.setItem('fotopfade_language', language); } catch (e) { /* ignorieren */ }
```

### Sprachkonflikt zwischen Routen

Ist die gespeicherte Sprache in der aktuell geladenen Route nicht verfügbar
(z.B. `en` gespeichert, aber Route hat nur `de`), fällt i18next nach
`fallbackLng: 'de'` zurück. **Kein expliziter Hinweis** an den Nutzer —
stille Fallback (AC-4 der User-Story-024).

---

## Alternativen

| Alternative | Bewertung |
|---|---|
| Cookie statt `localStorage` | Erfordert Cookie-Consent (DSGVO) für persistente Cookies — unverhältnismäßig für reine Sprachpräferenz |
| URL-Hash-Parameter für Sprache | Würde den Namespace-Hash (`#/koeln-muelheim`) kollidieren; `?lng=`-Parameter ist bereits etabliert für Sharing |
| Kein Persistenz — nur URL-Parameter | Nutzer muss Sprache bei jedem Aufruf neu wählen; schlechte UX |
| `sessionStorage` statt `localStorage` | Geht bei Tab-Schließung verloren — kein Mehrwert gegenüber nicht-persistenter Lösung |

---

## Konsequenzen

**Positiv:**
- Sprachpräferenz bleibt über Seitenladevorgänge und Browser-Neustarts erhalten
- Keine Serverinfrastruktur nötig
- Kein Cookie-Consent erforderlich (`localStorage` gilt nicht als Cookie im DSGVO-Sinne,
  sofern keine personenbezogenen Daten gespeichert werden — der Sprachcode ist kein
  personenbezogenes Datum)
- URL-Parameter übersteuert `localStorage` — Sharing-Links mit `?lng=en` funktionieren
  zuverlässig unabhängig von der gespeicherten Präferenz

**Negativ:**
- Domainweiter Scope: Eine auf `moers` eingestellte Sprache `en` gilt auch für den
  nächsten Aufruf von `koeln-muelheim` (nur `de`) — stille Fallback
- Kein Ablauf / Expiry des gespeicherten Wertes
- Nicht geräteübergreifend — auf einem anderen Gerät greift wieder die Browser-Sprache
