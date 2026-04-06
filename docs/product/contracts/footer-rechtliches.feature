# language: de
Feature: Footer und rechtliche Modalinhalte

  Als Nutzer der Fotopfade-App
  möchte ich jederzeit Zugang zu rechtlichen Informationen (Impressum, Datenschutz, Disclaimer)
  und zur Unterstützungsmöglichkeit haben,
  damit ich meine Rechte kenne und das Projekt unterstützen kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And die Sprache ist "de"

  Szenario: Footer zeigt die vier rechtlichen Links
    When die App geladen ist
    Then ist im Footer ein Navigationsbereich sichtbar
    And er enthält die Links "Impressum", "Disclaimer", "Datenschutz" und "Unterstützung"

  Szenario: Klick auf "Impressum" öffnet das Impressum-Modal
    When der Nutzer auf den Footer-Link "Impressum" klickt
    Then öffnet sich das Modal #fImpressumModal
    And der Inhalt wurde aus "locales/koeln-muelheim/de/impressumModalLi.md" geladen und angezeigt

  Szenario: Klick auf "Disclaimer" öffnet das Disclaimer-Modal
    When der Nutzer auf den Footer-Link "Disclaimer" klickt
    Then öffnet sich das Modal #fDisclaimerModal
    And der Inhalt wurde aus "locales/koeln-muelheim/de/disclaimerModalLi.md" geladen und angezeigt

  Szenario: Klick auf "Datenschutz" öffnet das Datenschutz-Modal
    When der Nutzer auf den Footer-Link "Datenschutz" klickt
    Then öffnet sich das Modal #fDatenschutzModal
    And der Inhalt wurde aus "locales/koeln-muelheim/de/datenschutzLi.md" geladen und angezeigt

  Szenario: Klick auf "Unterstützung" öffnet das Unterstützungs-Modal
    When der Nutzer auf den Footer-Link "Unterstützung" klickt
    Then öffnet sich das Modal #fCoffeeModal
    And der Inhalt wurde aus "locales/koeln-muelheim/de/bymecoffeeModalLi.md" geladen und angezeigt

  Szenario: Unterstützungs-Modal enthält einen PayPal-Link
    Given das Unterstützungs-Modal ist geöffnet
    When der Nutzer den Inhalt liest
    Then ist ein anklickbarer Link zu PayPal vorhanden
    And der Link öffnet sich in einem neuen Tab (target="_blank")
    And der Link enthält das rel-Attribut "noopener" zum Schutz vor tab-nabbing

  Szenario: Footer-Modalinhalte sind namespace- und sprachspezifisch
    Given die App wird mit einem anderen Namespace gestartet, z.B. "frankenberg"
    When der Nutzer das Impressum-Modal öffnet
    Then wird der Inhalt aus "locales/frankenberg/de/impressumModalLi.md" geladen
