# User Story: Einheitliches Erscheinungsbild der Benutzeroberfläche

## Visuelle Konsistenz in Navigation und modalen Dialogen herstellen

**Als** Nutzer der Fotopfad-App  
**möchte ich** eine visuell konsistente Benutzeroberfläche erleben,  
**damit** Navigation und Inhalte klar und aufgeräumt wirken und kein Element unbeabsichtigt hervorsticht.

### Hintergrund

Eine visuelle Prüfung der Oberfläche (Stand: April 2026) ergab folgende Inkonsistenzen:

1. **Burger-Menü**: Alle Menüeinträge erscheinen blau und unterstrichen – ein ungewolltes Link-Styling, das die Navigation unruhig wirken lässt.
2. **POI-Modal-Titel**: Der Titel im modalen Dialog eines Point of Interest wird blau dargestellt, obwohl vergleichbare Dialoge (z. B. „Features") schwarze Titel verwenden.
3. **Rahmen um Modal-Inhalte**: Mehrere modale Dialoge zeigen einen sichtbaren Rahmen (Border) um den Textbereich. Der modale Dialog „Start" dient als Referenz für das korrekte, rahmenlose Erscheinungsbild. Betroffen sind:
   - Geschichte
   - Über das Projekt
   - Features
   - QR-Code
   - Quellen
   - Attribution
4. **Fehlender Titel im Attribution-Dialog**: Der modale Dialog „Attribution" hat keinen sichtbaren Titel. Um konsistent mit allen anderen Dialogen zu sein, soll der Titel „Attribution" ergänzt werden – lokalisiert über die bestehenden i18n-Properties-Dateien.

### Akzeptanzkriterien

* Im geöffneten Burger-Menü sind alle Einträge **grau** und **nicht unterstrichen** dargestellt.
* Der Titel eines POI-Modals wird in **Schwarz** dargestellt (identisch mit dem „Features"-Dialog als Referenz).
* Die modalen Dialoge Geschichte, Über das Projekt, Features, QR-Code, Quellen und Attribution zeigen **keinen Rahmen** um den Textinhalt (identisch mit dem „Start"-Dialog als Referenz).
* Der modale Dialog „Attribution" besitzt einen Titel.
* Der Titel „Attribution" ist in allen unterstützten Sprachen über die jeweiligen i18n-Properties-Dateien konfigurierbar.
* Alle Änderungen sind ausschließlich über CSS oder i18n-Konfiguration umgesetzt – keine strukturellen HTML-Änderungen, die unbeabsichtigte Seiteneffekte erzeugen.
* Die Webapp startet fehlerfrei; die Browser-Konsole zeigt keine neuen Fehler im Zusammenhang mit den Änderungen.

### Betroffene Dateien (vorläufig)

| Datei | Warum betroffen |
|---|---|
| `assets/css/app.css` o. ä. | CSS-Anpassungen für Menü-Links und Modal-Titel/-Rahmen |
| `index.html` | Ggf. Titel-Element im Attribution-Modal ergänzen |
| `locales/<sprache>/translation.json` o. ä. | Lokalisierungsschlüssel `attribution.title` für alle Sprachen |

### Aufgaben (Tasks)

- [ ] **TASK-001** CSS – Burger-Menü-Links: Farbe auf Grau setzen und `text-decoration: none` ergänzen, sodass Einträge weder blau noch unterstrichen sind.
- [ ] **TASK-002** CSS – POI-Modal-Titel: Schriftfarbe auf Schwarz (`color: #000` o. ä.) setzen; „Features"-Dialog als Referenz verwenden.
- [ ] **TASK-003** CSS – Rahmen aus Modal-Inhalten entfernen: `border` / `border-radius` / `box-shadow` der betroffenen Dialoge (Geschichte, Über das Projekt, Features, QR-Code, Quellen, Attribution) auf den Stil des „Start"-Dialogs angleichen.
- [ ] **TASK-004** HTML – Attribution-Modal: Titel-Element (z. B. `<h5 class="modal-title">`) mit dem i18n-Schlüssel `attribution.title` ergänzen.
- [ ] **TASK-005** i18n – Schlüssel `attribution.title` mit dem Wert „Attribution" in alle vorhandenen Sprachdateien eintragen.
- [ ] **TASK-006** Manuelle Prüfung aller betroffenen Dialoge in mindestens zwei Sprachen (z. B. Deutsch und Englisch) auf korrekte Darstellung im Browser.
