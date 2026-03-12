# User Story: Modernes POI-Modal (Slide-up & Audio-First)

## 7. Interaktives POI-Modal mit Progressive Disclosure
**Als** Nutzer der App vor Ort  
**möchte ich** eine kompakte und visuell ansprechende Zusammenfassung des POI sehen,  
**damit** ich sofort das Gebäude erkenne, das Audio starten kann und nur bei Bedarf tiefere Textinformationen erhalte.

### Akzeptanzkriterien:
* **Visuelles Design:** Das Modal verwendet im oberen Bereich eine quadratische Box (Ratio 1:1), die Bilder via `object-fit: cover` unabhängig vom Originalformat (Hoch/Quer) füllend anzeigt.
* **Audio-Integration:** Ein prominenter, runder Play-Button mit Dreiecks-Symbol ist halb-überlappend zwischen Bild und Textbereich positioniert, um die Audio-Funktion als Hauptelement zu betonen.
* **Progressive Disclosure (Text):** * Initial wird unter dem Namen nur ein prägnanter Einzelsatz (Teaser) angezeigt.
    * Bei Klick/Tap auf den Textbereich gleitet die Box nach oben über das Bild (Slide-up-Effekt) und gibt einen ausführlicheren Textabsatz (ca. 50 Wörter) frei.
* **Usability-Indikator:** Ein dezenter optischer Hinweis (z. B. ein "Handle"-Strich am oberen Rand der Textbox) signalisiert die Ausziehbarkeit des Bereichs.
* **KI-Transparenz:** Der Hinweis auf die KI-gestützte Erstellung der Inhalte ist dezent am Ende des erweiterten Textes platziert.

### Technischer Hinweis:
Die Animation sollte mittels CSS-Transitions (`max-height` oder `transform: translateY`) flüssig umgesetzt werden, um auf Mobilgeräten eine native App-Haptik zu erzeugen. Der Play-Button muss eine feste Z-Ebene besitzen, damit er während der Text-Animation bedienbar bleibt.