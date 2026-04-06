# User-Story-012-TASK-008: `docs/product/contracts/modaldialoge.feature` – Tab-Szenarien ersetzen

## Zugehörige Story
User-Story-012 – Das Projekt – 5 eigenständige Burger-Menü-Einträge

## Beschreibung
Alle Szenarien, die das bisherige Tab-Modal `#aboutModalDiv` beschreiben, entfernen und durch fünf eigenständige Szenarien für die neuen Dialoge ersetzen. Zusätzlich muss der Contract `locale-fragmente.feature` angepasst werden: Er enthält ein Szenario für `aboutTabsHeader.html`, das nach TASK-007 nicht mehr existiert. Die Contract-Dateien sollen nach der Umsetzung den tatsächlichen Zustand der Applikation korrekt widerspiegeln.

## Technische Details
- Betroffene Dateien:
  - `docs/product/contracts/modaldialoge.feature` – Tab-Szenarien ersetzen
  - `docs/product/contracts/locale-fragmente.feature` – `aboutTabsHeader`-Szenario entfernen

## Zu entfernende Szenarien (Abschnitt `# --- About-Modal ---`)

```gherkin
  # --- About-Modal ---

  Szenario: About-Modal öffnet sich durch Klick auf "About" im Menü
    When der Nutzer auf den Menüpunkt "About" (about-btn) klickt
    Then öffnet sich das About-Modal (#aboutModalDiv)
    And das Modal zeigt fünf Reiter entsprechend "locales/koeln-muelheim/de/aboutTabsHeader.html"

  Szenario: About-Modal zeigt den Geschichts-Reiter als Standard
    When das About-Modal geöffnet wird
    Then ist der erste Reiter (Geschichte / expectModal) aktiv und sichtbar
    And der Inhalt zeigt den Text aus "locales/koeln-muelheim/de/expectModalLi.md"

  Szenario: Reiter "Über das Projekt" im About-Modal
    Given das About-Modal ist geöffnet
    When der Nutzer auf den Reiter "Über das Projekt" klickt
    Then wird der Inhalt aus "locales/koeln-muelheim/de/aboutModalLi.md" angezeigt

  Szenario: Reiter "Features" im About-Modal
    Given das About-Modal ist geöffnet
    When der Nutzer auf den Reiter "Features" klickt
    Then wird der Inhalt aus "locales/koeln-muelheim/de/featuresModalLi.md" angezeigt

  Szenario: Reiter "Quellen" im About-Modal
    Given das About-Modal ist geöffnet
    When der Nutzer auf den Reiter "Quellen" klickt
    Then wird der Inhalt aus "locales/koeln-muelheim/de/resourcesModalLi.md" angezeigt
```

## Einzufügende Szenarien (ersetzen den obigen Abschnitt)

```gherkin
  # --- Projekt-Dialoge (5 eigenständige Modals) ---

  Szenario: Geschichte-Dialog öffnet sich durch Klick auf "Geschichte" im Menü
    When der Nutzer auf den Menüpunkt "Geschichte" (geschichte-btn) klickt
    Then öffnet sich der Geschichte-Dialog (#geschichteModalDiv)
    And der Inhalt zeigt den Text aus "locales/koeln-muelheim/de/expectModalLi.md"

  Szenario: Über-das-Projekt-Dialog öffnet sich durch Klick im Menü
    When der Nutzer auf den Menüpunkt "Über das Projekt" (ueber-btn) klickt
    Then öffnet sich der Über-das-Projekt-Dialog (#ueberModalDiv)
    And der Inhalt zeigt den Text aus "locales/koeln-muelheim/de/aboutModalLi.md"

  Szenario: Features-Dialog öffnet sich durch Klick im Menü
    When der Nutzer auf den Menüpunkt "Features" (features-btn) klickt
    Then öffnet sich der Features-Dialog (#featuresModalDiv)
    And der Inhalt zeigt den Text aus "locales/koeln-muelheim/de/featuresModalLi.md"

  Szenario: QR-Code-Dialog öffnet sich durch Klick im Menü
    When der Nutzer auf den Menüpunkt "QR-Code" (links-btn) klickt
    Then öffnet sich der QR-Code-Dialog (#linksModalDiv)
    And der Inhalt zeigt den Text aus "locales/koeln-muelheim/de/linksModalLi.md"

  Szenario: Quellen-Dialog öffnet sich durch Klick im Menü
    When der Nutzer auf den Menüpunkt "Quellen" (resources-btn) klickt
    Then öffnet sich der Quellen-Dialog (#resourcesModalDiv)
    And der Inhalt zeigt den Text aus "locales/koeln-muelheim/de/resourcesModalLi.md"
```

## Zu entfernendes Szenario aus `locale-fragmente.feature`

Das folgende Szenario beschreibt das Laden von `aboutTabsHeader.html`, die in TASK-007 gelöscht wird:

```gherkin
  Szenario: HTML-Fragment für die Tab-Kopfzeile des About-Dialogs wird geladen
    When die Methode ModalBuilder.build("aboutTabsHeader", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/aboutTabsHeader.html" gesendet
    And bei erfolgreicher Antwort wird der HTML-Inhalt in das DOM-Element mit der ID "aboutTabsHeader" injiziert
    And die Tab-Kopfzeile zeigt die konfigurierten Reiter (Geschichte, Über das Projekt, Features, QR-Code, Quellen)
```

Dieses Szenario vollständig aus `locale-fragmente.feature` entfernen. Es ist kein Ersatz-Szenario notwendig, da `ModalBuilder.build()` für die fünf neuen Projekt-Dialoge nicht mehr eingesetzt wird (ihre Inhalte werden weiterhin per `loadMarkdown()` geladen).

## Schritte
- [ ] `docs/product/contracts/modaldialoge.feature` öffnen
- [ ] Den gesamten Abschnitt `# --- About-Modal ---` (6 Szenarien, inkl. Kommentarzeile) entfernen
- [ ] Den neuen Abschnitt `# --- Projekt-Dialoge (5 eigenständige Modals) ---` mit fünf Szenarien an derselben Stelle einfügen
- [ ] `docs/product/contracts/locale-fragmente.feature` öffnen
- [ ] Das Szenario `Szenario: HTML-Fragment für die Tab-Kopfzeile des About-Dialogs wird geladen` (inkl. When/Then-Zeilen) entfernen
- [ ] Prüfen (`modaldialoge.feature`): Kein Verweis auf `about-btn`, `aboutModalDiv`, `aboutTabsHeader` oder Tab-Reiter mehr vorhanden
- [ ] Prüfen (`modaldialoge.feature`): Alle fünf neuen Modal-IDs und Button-IDs sind korrekt referenziert
- [ ] Prüfen (`locale-fragmente.feature`): Kein Verweis auf `aboutTabsHeader` mehr vorhanden

## Reihenfolge
Dieser Task sollte **nach TASK-004 und TASK-005** ausgeführt werden, sodass die Contracts dem implementierten Zustand entsprechen.

## Ergebnis
Der Contract `modaldialoge.feature` spiegelt die fünf eigenständigen Projektdialoge korrekt wider; keine obsoleten Tab-Szenarien mehr vorhanden. Der Contract `locale-fragmente.feature` enthält kein Szenario mehr für das nicht länger existierende `aboutTabsHeader.html`.

## Status
Offen

## Aufwand
S
