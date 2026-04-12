# User Story 024 — Flexible Sprachwahl & Automatik

**Als** internationaler Besucher  
**möchte ich**, dass die App automatisch in meiner Sprache startet und ich die Sprache jederzeit mit einem einzelnen Klick im Header wechseln kann,  
**damit** ich die Inhalte ohne Sprachbarriere verstehe und meine Sprachpräferenz nicht bei jedem Besuch neu setzen muss.

---

## Kontext

Die App unterstützt aktuell mehrsprachige Inhalte — technisch über `i18next` und Locale-Verzeichnisse (`locales/<namespace>/<lang>/`). Die verfügbaren Sprachen je Route werden in `properties.json` unter dem Schlüssel `languages` deklariert. Derzeit hat nur die Route `moers` mehrere Sprachen (`de`, `en`, `fr`); alle anderen Routen haben ausschließlich `de`.

Der Sprachselektor sitzt aktuell als Menüpunkt im Burger-Menü (`#navbarMenu`). Er ist damit auf kleinen Bildschirmen erst nach einem Klick auf den Toggler sichtbar — ausgerechnet auf den Geräten, auf denen die meisten Nutzer die App verwenden.

---

## Akzeptanzkriterien

### AC-1 — Sprachbutton im Header
- Der Sprachselektor wird aus dem Burger-Menü entfernt.
- Im Header erscheint ein neuer Button, der **immer sichtbar** ist (außerhalb des Collapse, zwischen Brand und Navbar-Toggler).
- Der Button zeigt das Globus-Icon (`bi-globe2`) und das aktuelle Sprachkürzel in Großbuchstaben, z.B. `🌐 DE`.
- Ein Klick öffnet ein Bootstrap-Dropdown mit den verfügbaren Sprachen der aktuellen Route.
- Der Button ist auch dann sichtbar, wenn die Route nur eine Sprache hat (`de`). Die Einträge im Dropdown sind in diesem Fall auf `de` beschränkt.

### AC-2 — Automatische Spracherkennung beim Start
Die App ermittelt die Startsprache nach folgender Priorität (höhere Priorität zuerst):

1. **URL-Parameter** `?lng=<code>` (z.B. `?lng=en`) — höchste Priorität, überschreibt alles
2. **`localStorage`** — gespeicherte manuelle Auswahl des Nutzers
3. **Browser-Sprache** (`navigator.language`, bereits über `config.js` ermittelt)
4. **Fallback** `de` — greift, wenn keine der obigen Sprachen in der Route verfügbar ist

### AC-3 — Persistenz der manuellen Auswahl
- Wählt der Nutzer eine Sprache manuell über den Dropdown, wird sie unter dem Schlüssel `fotopfade_language` in `localStorage` gespeichert.
- Bei erneutem Laden der Seite (ohne URL-Parameter) wird dieser Wert als Startsprache verwendet.

### AC-4 — Stille Fallback bei Sprachkonflikt
- Ist die gespeicherte oder per Browser erkannte Sprache in der aktuell geladenen Route nicht verfügbar (z.B. `en` in `koeln-muelheim`, das nur `de` hat), fällt die App ohne Fehlermeldung auf `de` zurück.
- Das ist das Standard-Fallback-Verhalten von i18next (`fallbackLng: 'de'`). Es ist kein expliziter Hinweis an den Nutzer vorgesehen.

---

## Nicht-funktionale Anforderungen

- Der neue Header-Button soll auf kleinen Bildschirmen (< 576 px) nicht die Breite des Brand-Textes verdrängen. Das Sprachkürzel darf bei Platzmangel auf das reine Icon reduziert werden.
- Die Änderung darf die bestehende `LanguageSelector`-Klasse und `changeLanguage()`-Funktion wiederverwenden oder ersetzen, solange die Funktionalität erhalten bleibt.

---

## Betroffene Dateien

| Datei | Änderung |
|---|---|
| `index.html` | Neuer Sprachbutton im `<nav>` außerhalb von `#navbarMenu`; Sprachselektor-`<li>` aus dem Burger-Menü entfernen |
| `assets/js/config.js` | Startsprache-Ermittlung: Reihenfolge URL-Parameter → `localStorage` → Browser → Fallback |
| `assets/js/locale.js` | `changeLanguage()`: `localStorage` bei manueller Auswahl setzen; `LanguageSelector` auf neues DOM-Element anpassen |
| `assets/css/app.css` | ggf. Kompaktdarstellung des Header-Buttons auf kleinen Bildschirmen |

---

## Abgrenzung

- **Nicht** in dieser Story: Übersetzung neuer Inhalte oder Anlegen von Locale-Verzeichnissen für bisher einsprachige Routen.
- **Nicht** in dieser Story: Automatische Umleitung auf eine sprachspezifische URL.
- **Nicht** in dieser Story: Anzeige einer Fehlermeldung bei nicht verfügbarer Sprache (→ AC-4).