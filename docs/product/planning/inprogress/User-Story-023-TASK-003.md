# User-Story-023-TASK-003: `assets/js/app.js` — Markdown-Parser und Modal-Rendering

## Zugehörige Story
User-Story-023 – Audio-First POI-Darstellung

## Beschreibung
Das bisherige Vorgehen (Markdown → `marked.parse()` → roher HTML-Dump in
`#feature-info`) wird durch einen strukturierten Ansatz ersetzt:

1. Das gefetchte Markdown wird in seine Bestandteile zerlegt:
   - **Bild-URL** (aus dem ersten `![...](...)` im Markdown)
   - **Teaser-Text** (erster Fließtext-Absatz, auf 60–80 Wörter gekürzt)
   - **KI-Hinweis** (letzter Absatz in kursiver Markdown-Notation `_..._`)
2. Die Audio-URL wird per Konvention abgeleitet: gleiche Namespace/Sprache/ID,
   Endung `.mp3`.
3. Die abgeleiteten Daten werden in die DOM-Elemente aus TASK-001 eingefüllt.
4. Der Play-Button steuert das `<audio>`-Element.
5. Beim Schließen des Modals wird die Wiedergabe gestoppt.

## Betroffene Datei
- `assets/js/app.js`

---

## Änderung 1: Hilfsfunktion `parsePoiMarkdown` (neu, vor dem POI LAYER-Block)

Einfügen **vor** dem Kommentar `/* Single marker cluster layer ... */`:

```js
/**************************************************************************************************/
// POI MARKDOWN PARSER
/**************************************************************************************************/

/**
 * Zerlegt das Markdown einer POI-Datei in Bild-URL, Teaser-Text und KI-Hinweis.
 * Das Markdown darf formatierungsarm sein (kein HTML, keine Inline-Styles).
 *
 * Erwartet werden optional:
 *   - Erste Zeile: ![alt](./images/pfad/pN.jpg)
 *   - Fließtext-Absätze
 *   - Letzter kursiver Absatz: _Die Inhalte..._
 *   - Weitere Abschnitte (## Quellen, ## Audio) werden ignoriert
 *
 * @param {string} md       - Markdown-Inhalt der POI-Datei
 * @param {number} targetWords - Ziel-Wortanzahl für den Teaser (Standard: 70)
 * @returns {{ imageSrc: string, teaser: string, kiHint: string }}
 */
function parsePoiMarkdown(md, targetWords) {
  targetWords = targetWords || 70;

  // 1. Bild-URL aus erstem ![alt](src)  // Pfade der Form ./images/... → images/... werden normalisiert.
  // Pfade ohne ./-Präfix (images/...) bleiben unverändert — beides ist korrekt.  var imageMatch = md.match(/!\[.*?\]\((.*?)\)/);
  var imageSrc = imageMatch ? imageMatch[1].replace(/^\.\//, '') : '';

  // 2. KI-Hinweis: letzter mit _ ... _ markierter Absatz
  var kiMatch = md.match(/_([^_]+)_\s*$/);
  var kiHint = kiMatch ? kiMatch[1].trim() : '';

  // 3. Teaser: Alle Zeilen bereinigen
  var cleaned = md
    .replace(/!\[.*?\]\(.*?\)/g, '')          // Bilder entfernen
    .replace(/^#+\s.*$/gm, '')                 // Überschriften entfernen
    .replace(/<[^>]+>[\s\S]*?<\/[^>]+>/gm, '') // HTML-Blöcke entfernen
    .replace(/<[^>]+>/g, '')                   // einzelne HTML-Tags entfernen
    .replace(/^_.*_$/gm, '')                   // kursive Zeilen (KI-Hinweis) entfernen
    .replace(/^[-*]\s.*$/gm, '')               // Listeneinträge entfernen
    .replace(/\r?\n/g, ' ')                    // Zeilenumbrüche in Leerzeichen
    .replace(/\s{2,}/g, ' ')                   // Mehrfach-Leerzeichen normalisieren
    .trim();

  // 4. Auf Ziel-Wortanzahl kürzen
  var words = cleaned.split(' ').filter(function(w) { return w.length > 0; });
  var teaser = words.slice(0, targetWords).join(' ');
  if (words.length > targetWords) {
    teaser += ' \u2026'; // …
  }

  return { imageSrc: imageSrc, teaser: teaser, kiHint: kiHint };
}
```

---

## Änderung 2: `featureModal`-Listener für Audio-Stop (neu, bei den anderen Event-Listenern)

Einfügen nach dem Block `document.getElementById("start-tour-btn").addEventListener(...)`:

```js
// Audio beim Schliessen des POI-Modals stoppen und Icon zurücksetzen
document.getElementById("featureModal").addEventListener("hidden.bs.modal", function() {
  var audio = document.getElementById("feature-audio");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("feature-play-btn").classList.remove("is-playing");
});
```

---

## Änderung 3: Play-Button-Logik (neu, bei den anderen Event-Listenern)

Einfügen direkt nach dem Audio-Stop-Listener (Änderung 2):

```js
// Play/Pause-Toggle für den POI-Audio-Button.
// Das Icon (Play-Dreieck vs. Pause-Balken) wird ausschließlich über
// die CSS-Klasse .is-playing gesteuert — kein SVG-Attribut-Manipulation (→ TASK-002).
document.getElementById("feature-play-btn").addEventListener("click", function() {
  var audio = document.getElementById("feature-audio");
  var btn   = document.getElementById("feature-play-btn");
  if (audio.paused) {
    audio.play();
    btn.classList.add("is-playing");
  } else {
    audio.pause();
    btn.classList.remove("is-playing");
  }
});

// Icon zurücksetzen, wenn Audio natürlich endet
document.getElementById("feature-audio").addEventListener("ended", function() {
  document.getElementById("feature-play-btn").classList.remove("is-playing");
});
```

---

## Änderung 4: `onEachFeature` — Markdown parsen und Modal befüllen

Der bestehende `fetch(url)...then(mdFragment => ...)` und `layer.on click`-Block
wird ersetzt. Alter Code:

```js
var content = "";
var url = 'locales/' + namespace + '/' + languageCode + '/p' + feature.properties.id + '.md';

fetch(url).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
}).then(mdFragment => {
   content = marked.parse(mdFragment);
}).catch(error => {
    console.error('Beim Abrufen des MD-Fragments ist ein Fehler aufgetreten:', error);
});

layer.on({
  click: function (e) {
    const featureTitle = feature.properties.name;
    document.getElementById("feature-title").innerHTML = featureTitle;
    document.getElementById("feature-info").innerHTML = content;
    bootstrap.Modal.getOrCreateInstance(document.getElementById("featureModal")).show();
    highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
  }
});
```

Neuer Code:

```js
var poiMd = "";
var mdUrl = 'locales/' + namespace + '/' + languageCode + '/p' + feature.properties.id + '.md';

fetch(mdUrl).then(function(response) {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
}).then(function(mdFragment) {
  poiMd = mdFragment;
}).catch(function(error) {
  console.error('Beim Abrufen des MD-Fragments ist ein Fehler aufgetreten:', error);
});

layer.on({
  click: function (e) {
    // Bekannte Einschränkung: Falls der fetch() noch nicht abgeschlossen ist
    // (z.B. bei sehr langsamem Netz und sofortigem Klick), ist poiMd leer.
    // Das Modal wird dann mit leeren Feldern angezeigt. Dieses Race-Condition-
    // Verhalten entspricht dem bisherigen Stand und wird in dieser Story
    // nicht gelöst.
    var parsed   = parsePoiMarkdown(poiMd);
    var audioUrl = 'locales/' + namespace + '/' + languageCode + '/p' + feature.properties.id + '.mp3';

    document.getElementById("feature-title").textContent  = feature.properties.name;
    document.getElementById("feature-image").src          = parsed.imageSrc;
    document.getElementById("feature-image").alt          = feature.properties.name;
    document.getElementById("feature-text").textContent   = parsed.teaser;
    document.getElementById("feature-ki-hint").textContent = parsed.kiHint;

    var audio = document.getElementById("feature-audio");
    audio.src = audioUrl;
    audio.load();
    document.getElementById("feature-play-icon").setAttribute("points", "6,4 20,12 6,20");

    bootstrap.Modal.getOrCreateInstance(document.getElementById("featureModal")).show();
    highlight.clearLayers().addLayer(
      L.circleMarker(
        [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
        highlightStyle
      )
    );
  }
});
```

---

## Hinweise
- `textContent` statt `innerHTML` verhindert XSS beim Einfügen von Markdown-Text.
- `audio.load()` nach dem Setzen von `audio.src` erzwingt das Neuladen, damit
  bei wiederholtem Öffnen des Modals für verschiedene POIs kein altes Audio
  abgespielt wird.
- Das Icon-Wechseln erfolgt ausschließlich über die CSS-Klasse `.is-playing`
  auf dem Button (definiert in TASK-002) — kein `setAttribute` auf SVG-Elemente.
- `marked` wird für POI-Inhalte (`p*.md`) durch `parsePoiMarkdown()` ersetzt.
  Für alle anderen Modaldialoge (Geschichte, Über, Hilfe, Impressum usw.) wird
  `marked` weiterhin über `ModalBuilder.loadMarkdown()` genutzt — die Library-
  Referenz in `index.html` bleibt unverändert bestehen.
- **Race Condition:** Wenn der `fetch()` eines POI-Markdown noch läuft und der
  Nutzer den Marker sofort anklickt, ist `poiMd` leer → das Modal zeigt leere
  Felder. Dieses Verhalten ist dokumentiert und wird in dieser Story nicht gelöst.
  Der Click-Handler enthält einen Kommentar als Hinweis.
