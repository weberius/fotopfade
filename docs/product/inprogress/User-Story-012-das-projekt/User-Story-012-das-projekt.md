# User Story: Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Aufspaltung des Tab-Modals in separate Dialoge

**Als** Nutzer der Fotopfad-Webapp  
**möchte ich** die fünf Inhalte des Projekts (Geschichte, Über das Projekt, Features, QR-Code, Quellen) direkt als einzelne Einträge im Burger-Menü aufrufen,  
**damit** ich ohne Umweg über Tabs direkt zum gewünschten Inhalt navigieren kann.

**Als** Entwickler der Fotopfad-Webapp  
**möchte ich** den einzelnen zu einem gemeinsamen About-Modal mit Tab-Navigation zusammengefassten Dialog auflösen und durch fünf eigenständige modale Dialoge ersetzen,  
**damit** die Code-Struktur klarer und jeder Dialog unabhängig ansteuerbar ist.

### Hintergrund

Über den Menüpunkt „Das Projekt" (`about-btn`) öffnet sich aktuell ein einzelnes Modal (`#aboutModalDiv`) mit einer Tab-Navigation. Die Tab-Köpfe werden dynamisch aus `locales/<namespace>/<lang>/aboutTabsHeader.html` geladen; die Inhalte der fünf Tabs stammen aus je einer Markdown-Datei pro Locale:

| Tab-ID          | Bezeichnung         | Inhalts-Datei         |
|-----------------|---------------------|-----------------------|
| `expectModal`   | Geschichte          | `expectModalLi.md`    |
| `aboutModal`    | Über das Projekt    | `aboutModalLi.md`     |
| `featuresModal` | Features            | `featuresModalLi.md`  |
| `linksModal`    | QR-Code             | `linksModalLi.md`     |
| `resourcesModal`| Quellen             | `resourcesModalLi.md` |

Diese fünf Tabs sollen als fünf eigenständige Burger-Menü-Einträge mit je einem eigenen modalen Dialog realisiert werden. Die bestehenden Locale-Markdown-Dateien für die Inhalte bleiben unverändert erhalten.

### Akzeptanzkriterien

* **Fünf Menüeinträge:** Das Burger-Menü enthält anstelle des einzelnen Eintrags „Das Projekt" die fünf Einträge in dieser Reihenfolge: Geschichte, Über das Projekt, Features, QR-Code, Quellen.
* **Eigene Modals:** Jeder Menüeintrag öffnet genau einen eigenständigen modalen Dialog mit eigenem Titel und eigenem `id`-Attribut.
* **Inhalte unverändert:** Die Inhalte der fünf Dialoge werden weiterhin aus den bisherigen Locale-Markdown-Dateien (`expectModalLi.md`, `aboutModalLi.md`, `featuresModalLi.md`, `linksModalLi.md`, `resourcesModalLi.md`) geladen.
* **Tab-Navigation entfernt:** Das Modal `#aboutModalDiv` mit `#aboutTabsHeader` und `#aboutTabsContent` ist vollständig entfernt.
* **`aboutTabsHeader.html` entfernt:** Die Locale-Fragmentdateien `aboutTabsHeader.html` werden in allen Locale-Verzeichnissen gelöscht.
* **Lokalisierung:** Titel und Bezeichnungen der neuen Menüeinträge und Modal-Überschriften sind über `properties.json` lokalisierbar (neue i18n-Schlüssel: z. B. `geschichteTitle`, `aboutTitle`, `featuresTitle`, `linksTitle`, `resourcesTitle`).
* **Burger-Menü schließt:** Das Burger-Menü schließt sich nach dem Klick auf einen der neuen Einträge (analog zum bestehenden Verhalten der anderen Einträge).
* **Keine JavaScript-Fehler:** Die Browser-Konsole zeigt nach der Änderung keine neuen Fehler.

### Betroffene Dateien

| Datei | Warum betroffen |
|---|---|
| `index.html` | `about-btn`-Eintrag durch 5 neue `<li>`-Einträge ersetzen; `#aboutModalDiv` entfernen; 5 neue Modal-Divs hinzufügen |
| `assets/js/app.js` | `about-btn`-Click-Handler entfernen; 5 neue Click-Handler für die neuen Menüeinträge ergänzen |
| `assets/js/locale.js` | `aboutSelectorSpan` und `closeBtnAboutModal`-Referenzen durch 5 neue Span-IDs ersetzen; `ModalBuilder`-Aufrufe für `aboutTabsHeader` entfernen; neue `updateContent()`-Aufrufe für die Modal-Titel ergänzen |
| `locales/**/properties.json` | Neue i18n-Schlüssel für die fünf Menüeintrags- und Modal-Titel ergänzen (alle Locales) |
| `locales/**/aboutTabsHeader.html` | Dateien in allen Locale-Verzeichnissen löschen (nicht mehr benötigt) |
| `docs/product/contracts/modaldialoge.feature` | Szenarien für das About-Modal anpassen: Tab-Szenarien entfernen, 5 eigenständige Szenarien ergänzen |

### Aufgaben (Tasks)

- [ ] **TASK-001** `index.html` – `about-btn`-`<li>`-Eintrag durch 5 neue `<li>`-Einträge (`geschichte-btn`, `ueber-btn`, `features-btn`, `links-btn`, `resources-btn`) mit je einem `<span>`-Element für die lokalisierbare Bezeichnung ersetzen
- [ ] **TASK-002** `index.html` – `<div id="aboutModalDiv">` (inkl. Tab-Header `#aboutTabsHeader`, Tab-Content `#aboutTabsContent` und aller fünf `.tab-pane`-Divs) vollständig entfernen
- [ ] **TASK-003** `index.html` – 5 neue eigenständige `<div class="modal fade">`-Dialoge hinzufügen (`#geschichteModalDiv`, `#ueberModalDiv`, `#featuresModalDiv`, `#linksModalDiv`, `#resourcesModalDiv`), jeweils mit Modal-Titel-Span, Card-Body und Schließen-Button
- [ ] **TASK-004** `assets/js/app.js` – `about-btn`-Click-Handler entfernen; 5 neue Click-Handler für `geschichte-btn`, `ueber-btn`, `features-btn`, `links-btn`, `resources-btn` ergänzen *(abhängig von TASK-001 und TASK-003)*
- [ ] **TASK-005** `assets/js/locale.js` – `aboutSelectorSpan`-Zeile durch 5 neue `innerHTML`-Zuweisungen für die neuen Span-IDs ersetzen; `ModalBuilder`-Aufruf für `aboutTabsHeader` entfernen; `ModalBuilder`-Aufrufe für die 5 Inhalts-Karten auf die neuen Card-IDs aktualisieren; Modal-Titel-Spans lokalisieren; `closeBtnAboutModal`-Referenzen anpassen *(abhängig von TASK-003)*
- [ ] **TASK-006** `locales/**/properties.json` – Neue i18n-Schlüssel ergänzen (alle betroffenen Locale-Verzeichnisse): `geschichteTitle`, `ueberTitle`, `featuresTitle`, `linksTitle`, `resourcesTitle` sowie angepasste Bezeichnungen für die Menüeinträge *(kann parallel zu TASK-001–005 erfolgen)*
- [ ] **TASK-007** `locales/**/aboutTabsHeader.html` – Dateien in allen Locale-Verzeichnissen entfernen *(nach TASK-005)*
- [ ] **TASK-008** `docs/product/contracts/modaldialoge.feature` – Szenarien zum About-Modal überarbeiten: Tab-Szenarien entfernen, je ein Szenario pro neuem Dialog ergänzen *(nach TASK-004 und TASK-005)*
