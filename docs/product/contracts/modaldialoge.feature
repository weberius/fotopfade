# language: de
Feature: Modale Dialoge

  Als Nutzer der Fotopfade-App
  möchte ich in verschiedenen modalen Dialogen Informationen zum Fotopfad,
  zu Sehenswürdigkeiten und zur App selbst abrufen können,
  damit ich gut informiert bin und die App optimal nutzen kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And die Sprache ist "de"

  # --- Startmodal ---

  Szenario: Startmodal öffnet sich automatisch nach dem Laden der Route
    Given die Routendaten aus "service/route/koeln-muelheim.geojson" wurden geladen
    And die Kartengrenzen der Route sind gültig
    When die Karte auf die Routengrenzen ausgerichtet wird
    Then öffnet sich das Startmodal (#startModal) automatisch
    And der Inhalt des Modals zeigt die aus "locales/koeln-muelheim/de/startModalBody.md" geladene Beschreibung

  Szenario: Startmodal schließt sich automatisch nach 30 Sekunden
    Given das Startmodal ist geöffnet
    When 30 Sekunden vergangen sind
    Then schließt sich das Startmodal automatisch

  Szenario: Startmodal wird erneut geöffnet durch Klick auf "Start" im Menü
    Given die App ist geladen
    When der Nutzer auf den Menüpunkt "Start" (full-extent-btn) klickt
    Then öffnet sich das Startmodal (#startModal)
    And die Karte zoomt erneut auf die Ausdehnung der Route

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

  # --- Routen-Modal (legendModal) ---

  Szenario: Routen-Modal wird durch Klick auf "Route" im Menü geöffnet
    When der Nutzer auf den Menüpunkt "Route" (legend-btn) klickt
    Then öffnet sich das Routen-Modal (#legendModal)
    And nach vollständigem Einblenden des Modals (shown.bs.modal) wird die DataTables-Tabelle initialisiert
    And die Tabelle lädt die Etappendaten per AJAX aus "service/data/koeln-muelheim.json"
    And die Tabelle hat die Spalten "Name", "Zeit" und "Entfernung"

  Szenario: Routen-Modal DataTable wird nur beim ersten Öffnen initialisiert
    Given das Routen-Modal wurde bereits einmal geöffnet und die DataTable ist initialisiert
    When der Nutzer das Routen-Modal erneut öffnet
    Then wird die DataTable nicht erneut initialisiert
    And die bereits geladenen Etappendaten bleiben sichtbar

  # --- Feature-Modal (POI-Dialog) ---

  Szenario: Feature-Modal zeigt die Sehenswürdigkeit nach Klick auf einen Marker
    Given der POI-Layer ist geladen
    When der Nutzer auf einen POI-Marker klickt
    Then öffnet sich das Feature-Modal (#featureModal)
    And die Überschrift zeigt den Namen der Sehenswürdigkeit
    And der Inhalt zeigt die konvertierte HTML-Beschreibung aus der zugehörigen Markdown-Datei

  Szenario: Feature-Modal kann geschlossen werden
    Given das Feature-Modal ist geöffnet
    When der Nutzer auf "Schliessen" klickt
    Then schließt sich das Feature-Modal

  # --- Attributions-Modal ---

  Szenario: Attributions-Modal öffnet sich über den Attributions-Link
    When der Nutzer auf den "Attribution"-Link in der Kartenattribution klickt
    Then öffnet sich das Attributions-Modal (#attributionModal)
    And der Inhalt zeigt die aus "locales/koeln-muelheim/de/attributionModalLi.md" geladenen Quellenangaben
