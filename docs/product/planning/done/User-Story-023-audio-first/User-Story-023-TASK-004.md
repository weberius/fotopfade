# User-Story-023-TASK-004: `locales/**/p*.md` — `<audio>`-Blöcke automatisiert entfernen

## Zugehörige Story
User-Story-023 – Audio-First POI-Darstellung

## Beschreibung
Die Audio-Wiedergabe wird ab US-023 vollständig von der App gesteuert.
Die `<audio>`-HTML-Elemente und der zugehörige `## Audio`-Abschnitts-Header
in den Markdown-Dateien der POIs sind daher redundant und werden entfernt.

Ca. 170 `p*.md`-Dateien in den folgenden Locales sind betroffen:
- `frankenberg/de/` (50 Dateien)
- `fritzlar/de/` (34 Dateien)
- `homberg/de/` (8 Dateien)
- `koeln-muelheim/de/` (37 Dateien)
- `korbach/de/` (30 Dateien)
- `moers/de/` (18 Dateien)

## Betroffene Dateien
- Alle `locales/**/p*.md`

## Anleitung

### Vorbereitung

Committed-Stand sichern, dann Script ausführen:

```bash
cd /workspaces/fotopfade-workspace/fotopfade
```

### Script

Das folgende Python-Script entfernt in jeder `p*.md`-Datei den Block
`## Audio\n\n<audio ...>...</audio>`.
Es ist so formuliert, dass es mehrfach idempotent ausgeführt werden kann.

```python
#!/usr/bin/env python3
"""
Entfernt den ## Audio-Block (Überschrift + <audio>-Element) aus allen p*.md-Dateien.
Aufruf: python3 remove_audio_blocks.py
Muss aus dem fotopfade/-Verzeichnis ausgeführt werden.
"""
import re
import pathlib

LOCALES_DIR = pathlib.Path("locales")

# Regex: optionales ## Audio, dann optionaler Leerzeile, dann <audio ...>...</audio>
AUDIO_BLOCK = re.compile(
    r'## Audio\s*\n\s*\n?'              # ## Audio-Überschrift
    r'<audio[^>]*>.*?</audio>',         # <audio ...>...</audio>
    re.DOTALL | re.IGNORECASE
)

changed = 0
for md_file in sorted(LOCALES_DIR.rglob("p*.md")):
    original = md_file.read_text(encoding="utf-8")
    cleaned  = AUDIO_BLOCK.sub("", original)
    # Mehrfach-Leerzeilen normalisieren (max. 2 aufeinander folgende)
    cleaned  = re.sub(r'\n{3,}', '\n\n', cleaned).rstrip() + '\n'
    if cleaned != original:
        md_file.write_text(cleaned, encoding="utf-8")
        print(f"  bereinigt: {md_file}")
        changed += 1

print(f"\nFertig. {changed} Datei(en) geändert.")
```

### Ausführung

```bash
python3 remove_audio_blocks.py
```

### Ergebnis prüfen

```bash
# Keine Treffer mehr erwünscht:
grep -r "<audio" locales/
```

### Struktur nach der Bereinigung (Beispiel `p1.md`)

**Vorher:**
```markdown
![Bahnhof](./images/koeln-muelheim/p1.jpg)

Der Bahnhof Köln-Mülheim entwickelte sich ...

## Audio

<audio controls class="full-width-audio">
  <source src="locales/koeln-muelheim/de/p1.mp3" type="audio/mpeg">
  Dein Browser unterstützt kein Audioelement.
</audio>

## Hinweis

_Die Inhalte wurden unter Einsatz von KI-Werkzeugen erstellt ..._
```

**Nachher:**
```markdown
![Bahnhof](./images/koeln-muelheim/p1.jpg)

Der Bahnhof Köln-Mülheim entwickelte sich ...

## Hinweis

_Die Inhalte wurden unter Einsatz von KI-Werkzeugen erstellt ..._
```

## Hinweise
- `## Quellen`-Abschnitte (vorhanden z. B. in `fritzlar/de/`) werden **nicht**
  entfernt. Sie enthalten wertvolle Quellenangaben. Die App zeigt sie nicht an
  (der Parser in TASK-003 ignoriert Überschriften und Listeneinträge).
- Das Script verändert ausschließlich Dateien, die einen `<audio>`-Block enthalten.
  Alle anderen Dateien bleiben unberührt.
- Das Script kann gefahrlos mehrfach ausgeführt werden (idempotent).
