# User Story: Audio-First POI-Darstellung

**Als** Wanderer auf dem Fotopfad  
**möchte ich** beim Klick auf einen POI eine kompakte, visuell ansprechende Zusammenfassung sehen und sofort entscheiden können, ob ich die Geschichte lesen oder hören möchte,  
**damit** ich das Smartphone wegstecken und die Umgebung genießen kann.

## Akzeptanzkriterien

### Aufbau des modalen Dialogs

Der modale Dialog ist in drei Bereiche gegliedert:

1. **Header:** Zeigt den Namen des POI als Überschrift.
2. **Content-Bereich (von oben nach unten):**
   - **Foto:** Das Bild wird in einer quadratischen Box (Seitenverhältnis 1:1, `object-fit: cover`) angezeigt, damit Hoch- und Querformate gleich viel Platz einnehmen.
   - **Audio-Element:** Ein prominenter, runder Play-Button mit Dreiecks-Symbol ist so positioniert, dass er leicht in das Bild hineinragt und der nachfolgende Text ihn umfließt. Es gibt kein Autoplay — der Nutzer startet die Wiedergabe manuell.
   - **Teaser-Text:** Ein Fließtext von 60–80 Wörtern. Der Text wird aus dem Markdown-Inhalt des POI (z. B. `p1.md`) automatisch auf 60–80 Wörter gekürzt, falls er länger ist.
   - **KI-Hinweis:** Ein dezenter Hinweis am Ende des Textes, dass die Inhalte unter Einsatz von KI-Werkzeugen erstellt wurden.
3. **Footer:** Ein „Schliessen"-Button schließt den Dialog.

### Inhaltsstruktur der Markdown-Dateien

- Die Markdown-Dateien der einzelnen POIs (z. B. `p1.md`) liefern Foto, Audio-Quelle und Text als strukturierten, aber formatierungsarmen Inhalt.
- Die Darstellung (Styling, Button-Form, Textkürzung) wird vollständig durch die App gesteuert, nicht durch das Markdown.
- Die Markdown-Dateien werden an anderer Stelle generiert und sollen perspektivisch in mehreren Sprachen vorliegen.

## Nicht im Scope

- Progressive Disclosure (Slide-up-Effekt für den Text) — wird in einer späteren Ausbaustufe umgesetzt.
- Unterschiedliche Marker-Icons auf der Karte zur Signalisierung von Audio-Inhalten.
- Behandlung von POIs ohne Audio-Datei.

## Hinweis zur Abgrenzung

Diese Story ersetzt und schließt User Story 026 (ursprünglich „Modernes POI-Modal (Slide-up & Audio-First)") ein. US-026 wird nicht separat umgesetzt.
