# ADR-014: Content-Contract für POI-Markdown-Dateien (`p<id>.md`)

**Datum:** 2026-04  
**Status:** Akzeptiert  
**Umgesetzt in:** User-Story-023

---

## Kontext

POI-Beschreibungen werden als Markdown-Dateien im Verzeichnis
`locales/<namespace>/<lang>/p<id>.md` abgelegt. Diese Dateien werden:

- **extern generiert** (durch KI-Werkzeuge oder Redakteure, nicht durch die App),
- **perspektivisch mehrsprachig** gepflegt (für jede Sprache eine eigene Datei),
- **von der App maschinell geparst** (nicht durch `marked.js`, sondern durch
  die Funktion `parsePoiMarkdown()` in `assets/js/app.js`).

Da `parsePoiMarkdown()` bestimmte Konventionen über Position und Notation der
Inhalte voraussetzt, muss dieser Vertrag explizit dokumentiert werden. Ohne
Dokumentation entstehen stille Fehler bei der Generierung neuer Dateien.

---

## Entscheidung

Eine `p<id>.md`-Datei **muss** folgendem Aufbau entsprechen:

### Pflichtbestandteile (in dieser Reihenfolge)

```markdown
![Alternativtext](./images/<namespace>/p<id>.jpg)

Fließtext des POI. Dieser Text sollte 60–80 Wörter umfassen.
Mehrere Absätze sind zulässig; für den Teaser wird der gesamte
Fließtext auf 70 Wörter gekürzt.

_Die Inhalte wurden unter Einsatz von KI-Werkzeugen erstellt und
sorgfältig überprüft. Vereinzelt können Unstimmigkeiten nicht
ausgeschlossen werden._
```

### Optionale Bestandteile

```markdown
## Quellen

- Quellenangabe 1
- Quellenangabe 2
```

### Explizit verbotene Bestandteile

```markdown
<!-- NICHT mehr verwenden: wird durch parsePoiMarkdown() ignoriert,
     aber aus Klarheitsgründen aus den Dateien entfernt (TASK-004) -->

## Audio

<audio controls ...>
  <source src="..." type="audio/mpeg">
</audio>
```

---

## Formatregeln

| Element | Regel |
|---|---|
| Bild | Erste Zeile der Datei, `![alt](./images/<namespace>/p<id>.jpg)` |
| Bild-Pfad | Beginnt mit `./images/` oder `images/` — kein absoluter Pfad |
| Fließtext | Plain-Text-Absätze ohne Markdown-Inline-Formatierung (kein **fett**, kein *kursiv* außer KI-Hinweis) |
| Teaser-Länge | Ziel: 60–80 Wörter. `parsePoiMarkdown()` kürzt auf 70 Wörter mit `…` |
| KI-Hinweis | Letzter Absatz der Datei, kursiv notiert: `_Text._` |
| Überschriften | Zulässig für optionale Abschnitte (`## Quellen`), nicht im Fließtext |
| Listen | Nur in `## Quellen`-Abschnitt |
| HTML | Kein eingebettetes HTML (außer entfernten `<audio>`-Blöcken, die durch TASK-004 bereinigt werden) |
| Audio | Kein `<audio>`-Element in der Datei — Audio-URL wird von der App per Konvention abgeleitet: `p<id>.mp3` im selben Verzeichnis |

---

## Abgeleitete Audio-URL

Die App leitet die Audio-URL direkt aus der Markdown-Datei ab:

```
locales/<namespace>/<lang>/p<id>.mp3
```

Es gibt kein explizites Audio-Referenz-Feld in der Datei. Die mp3-Datei muss
im selben Verzeichnis wie die md-Datei liegen und den gleichen Basis-Namen tragen.

---

## Verhalten des Parsers bei Regelverstößen

| Regelverstoß | Verhalten |
|---|---|
| Kein Bild in der ersten Zeile | `imageSrc` ist leer string; `<img>` im Modal zeigt kein Bild |
| KI-Hinweis fehlt oder steht nicht am Ende | `kiHint` ist leer string; KI-Hinweis-Bereich im Modal bleibt leer |
| Text zu kurz (< 70 Wörter) | Kein `…` am Ende; Text wird vollständig angezeigt |
| HTML-Elemente im Fließtext | Werden durch den Parser entfernt; Inhalt kann unvollständig erscheinen |
| `<audio>`-Block vorhanden | Wird durch den Parser entfernt; kein Fehler, aber redundante Bereinigung |

---

## Alternativen

| Alternative | Bewertung |
|---|---|
| Teaser als explizites Feld in `properties.json` | Höherer Pflegeaufwand, Redundanz zum Fließtext |
| Separates Teaser-Feld in einer neuen `p<id>-teaser.md` | Unnötig viele Dateien je POI |
| Strukturiertes Format (YAML Frontmatter) | Erhöht Komplexität für Redakteure; gewählter Ansatz bleibt Markdown-nativ |
| `marked.js` weiterhin nutzen + CSS für Darstellung | `innerHTML` mit user-generiertem Markdown birgt XSS-Risiko; `textContent` ist sicherer |

---

## Konsequenzen

**Positiv:**
- Klarer Vertrag für externe Tools und Redakteure, die Inhalte generieren
- `parsePoiMarkdown()` kann sich auf stabile Konventionen verlassen
- XSS-sicher durch `textContent` statt `innerHTML`
- Neue Sprachen durch Anlegen einer Verzeichnisstruktur und Dateien nach diesem Schema

**Negativ:**
- Bestehende Abweichungen vom Format (z.B. alte `<audio>`-Blöcke) müssen
  bereinigt werden (→ TASK-004)
- Fehler im Format sind still (kein Validierungsschritt in der App)
- Kein Fallback, wenn die mp3-Datei fehlt (Browser-Fehler beim Laden)
