# ADR-008: Bedarfsgesteuertes Laden von Locale-Fragmenten via ModalBuilder

**Datum:** 2026-04  
**Status:** Akzeptiert

---

## Kontext

Die Fotopfade-App zeigt in mehreren modalen Dialogen und UI-Bereichen Inhalte, die:

- **namespace-spezifisch** sind (jeder Fotopfad hat eigene Texte),
- **sprachspezifisch** sind (mehrere Sprachen pro Namespace möglich),
- **unterschiedliche Formate** haben (redaktionelle Fließtexte als Markdown, strukturelle HTML-Elemente wie Tab-Navigationen oder Tabellen als HTML-Fragmente),
- **nicht alle beim Seitenaufladen benötigt** werden (z. B. Modalinhalte sind erst beim Öffnen erforderlich).

Da die App vollständig statisch ist (ADR-001) und alle Inhalte als separate Dateien vorliegen, muss ein Mechanismus definiert werden, der diese Fragmente zur Laufzeit abruft und in den DOM injiziert.

## Entscheidung

Es wird ein **bedarfsgesteuertes Ladesystem** (Lazy Loading) eingeführt, das durch die Klasse `ModalBuilder` in `assets/js/app.js` umgesetzt wird. Der Mechanismus folgt diesen Regeln:

### Pfadschema

Alle Locale-Fragmente folgen dem Pfadschema:

```
locales/<namespace>/<lang>/<dateiname>.<ext>
```

Dabei ist `<ext>` entweder `.html` (strukturelle Fragmente) oder `.md` (redaktionelle Inhalte).

### Klasse ModalBuilder

Die Klasse `ModalBuilder` bietet zwei Methoden:

| Methode | Dateiformat | Verwendungszweck |
|---|---|---|
| `build(elementId, lang)` | `.html` | Strukturelle UI-Bausteine (Tab-Navigation, Tabellen-Gerüste, Attribution) |
| `loadMarkdown(elementId, lang, fileName?)` | `.md` | Redaktionelle Fließtexte (Projektbeschreibung, POI-Texte, rechtliche Hinweise) |

Beide Methoden:
1. Berechnen den Pfad aus `namespace`, `lang` und `elementId` (bzw. optionalem `fileName`)
2. Senden einen `fetch()`-GET-Request an diesen Pfad
3. Bei Erfolg (`response.ok`): injizieren den Inhalt per `element.innerHTML` in das Ziel-DOM-Element
4. Bei `.md`: konvertieren das Markdown zuvor mit `marked.parse()` in HTML
5. Bei Fehler: protokollieren einen Fehler in der Browser-Konsole, das Ziel-Element bleibt leer

### Aufrufzeitpunkt

Die `ModalBuilder`-Methoden werden in der Funktion `updateContent()` (in `assets/js/locale.js`) aufgerufen. `updateContent()` wird ausgelöst durch:
- den i18next-Initialisierungs-Callback nach erfolgreichem Laden von `properties.json`
- jeden Aufruf von `changeLanguage()` bei Sprachumschaltung

Das bedeutet: **Alle Fragmente werden bei der ersten Initialisierung (und bei Sprachwechsel) asynchron und parallel angefragt**, nicht erst beim Öffnen des jeweiligen Modals.

### Ausnahme: POI-Beschreibungen

POI-spezifische Markdown-Dateien (`p<id>.md`) werden **nicht über `ModalBuilder`** geladen, sondern direkt im `onEachFeature`-Callback von Leaflet (in `assets/js/app.js`), wenn der POI-Layer aufgebaut wird. Das rohe Markdown wird in der Closure-Variable `poiMd` vorgehalten.

Beim Klick auf einen Marker wird `parsePoiMarkdown(poiMd)` aufgerufen, das die Datei in ihre Bestandteile (Bild-URL, Teaser-Text, KI-Hinweis) zerlegt. Diese werden per `textContent` in die fest definierten DOM-Elemente des `#featureModal` geschrieben — **kein `marked.parse()`**, **kein `innerHTML`** für POI-Inhalte. Das Format der `p<id>.md`-Dateien ist als Content-Contract in ADR-014 festgelegt.

### HTML-Fragmente vs. Markdown-Fragmente

| Kriterium | `.html`-Fragment | `.md`-Fragment |
|---|---|---|
| Zielgruppe | Entwickler | Redakteure / Entwickler |
| Inhalt | Strukturelles HTML (Tabellen, Tab-Elemente) | Fließtext mit Formatierung, Bildern, Audio |
| Lademethode | `ModalBuilder.build()` | `ModalBuilder.loadMarkdown()` |
| Konvertierung | keine (direktes innerHTML) | marked.js → HTML |
| Beispiele | `routModalBody.html`, `leaflet-control-attribution.html` | `startModalBody.md`, `impressumModalLi.md` (nicht `p<id>.md` — siehe ADR-014) |

## Alternativen

| Alternative | Bewertung |
|---|---|
| Alle Inhalte eingebettet in `index.html` | Keine Mehrsprachigkeit, keine Namespace-Trennung möglich |
| Alle Inhalte in `properties.json` | Kein Markdown-Support, keine Medieneinbettung (Audio, Bilder) |
| Laden nur beim Öffnen eines Modals | Würde zu wahrnehmbaren Ladezeiten bei Nutzung führen; gewählter Ansatz lädt beim Sprachinit |
| Web Components / Shadow DOM | Überdimensioniert für statische Inhalte |
| Service Worker / Cache-First | Sinnvolle Ergänzung, aber orthogonale Entscheidung |

## Konsequenzen

**Positiv:**
- Klare Trennung von Inhalt (`locales/`) und Logik (`assets/js/`)
- Neue Sprachen oder Pfade durch Anlegen der Verzeichnisstruktur hinzufügbar, ohne Codeänderung
- Redakteure können Markdown-Inhalte pflegen ohne HTML-Kenntnisse
- Strukturelle UI-Bausteine sind vom redaktionellen Inhalt getrennt

**Negativ:**
- N+1 HTTP-Requests beim Laden der Seite (je ein Request pro Fragment)
- Fehlende Fragmente (404) bleiben für den Nutzer unsichtbar → stille Fehler
- Race conditions möglich, wenn `updateContent()` mehrfach schnell aufgerufen wird
- Kein Caching-Mechanismus in der App selbst (Browser-Cache trägt aber automatisch bei)
