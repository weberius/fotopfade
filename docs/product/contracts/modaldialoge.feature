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

  Szenario: Startmodal schließt sich nicht automatisch
    Given das Startmodal ist geöffnet
    When 60 Sekunden vergangen sind
    Then ist das Startmodal weiterhin sichtbar

  Szenario: Startmodal wird erneut geöffnet durch Klick auf "Start" im Menü
    Given die App ist geladen
    When der Nutzer auf den Menüpunkt "Start" (full-extent-btn) klickt
    Then öffnet sich das Startmodal (#startModal)
    And die Karte zoomt erneut auf die Ausdehnung der Route

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

  Szenario: Unterstützungs-Dialog öffnet sich durch Klick auf letzten Navbar-Eintrag
    When der Nutzer auf den Menüpunkt "Unterstützung" (nav-coffee-btn) klickt
    Then öffnet sich das Unterstützungs-Modal (#fCoffeeModal)
    And das Navbar-Menü schließt sich
    And der Inhalt wurde aus "locales/koeln-muelheim/de/bymecoffeeModalLi.md" geladen und angezeigt

  Szenario: Unterstützungs-Modal enthält einen PayPal-Link
    Given das Unterstützungs-Modal (#fCoffeeModal) ist geöffnet
    When der Nutzer den Inhalt liest
    Then ist ein anklickbarer Link zu PayPal vorhanden
    And der Link öffnet sich in einem neuen Tab (target="_blank")
    And der Link enthält das rel-Attribut "noopener" zum Schutz vor tab-nabbing

  Szenario: Unterstützungs-Dialog erscheint nicht im Footer
    When die App geladen ist
    Then enthält der Footer keinen Link mit der ID "footer-coffee-btn"
    And enthält der Footer keinen Link mit dem Text "Unterstützung"

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

  Szenario: Attributions-Modal zeigt einen lokalisierten Titel
    Given das Attributions-Modal ist geöffnet
    Then zeigt die Modal-Überschrift den Wert von "attributionTitle" aus properties.json
    And der Titel lautet standardmäßig "Attribution"

  # --- Hilfe-Dialog ---

  Szenario: Hilfe-Dialog öffnet sich durch Klick auf den ?-Button auf der Karte
    Given die App ist geladen
    When der Nutzer auf den ?-Button (HelpControl) auf der Karte klickt
    Then öffnet sich der Hilfe-Dialog (#hilfeModalDiv)
    And die Überschrift zeigt den Wert von "hilfeTitle" aus properties.json

  Szenario: Hilfe-Dialog zeigt die Bedienungshinweise
    Given der Hilfe-Dialog (#hilfeModalDiv) ist geöffnet
    Then enthält der Dialog-Body den aus "locales/koeln-muelheim/de/hilfeModalLi.md" geladenen Inhalt

  Szenario: Hilfe-Dialog schließt sich nur durch explizite Nutzeraktion
    Given der Hilfe-Dialog (#hilfeModalDiv) ist geöffnet
    When der Nutzer auf "Schliessen" klickt
    Then schließt sich der Hilfe-Dialog
    And das Schliessen findet ausschließlich durch Nutzeraktion statt (kein Auto-Close)
