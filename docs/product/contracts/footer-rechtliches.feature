# language: de
Feature: Footer und rechtliche Pflichtangaben

  Als Nutzer der Fotopfade-App
  möchte ich jederzeit Zugang zu den rechtlich vorgeschriebenen Angaben (Impressum, Datenschutz, Disclaimer)
  haben,
  damit ich meine Rechte kenne und die App rechtssicher betrieben wird.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And die Sprache ist "de"

  Szenario: Footer zeigt genau die drei rechtlichen Pflichtlinks
    When die App geladen ist
    Then ist im Footer ein Navigationsbereich sichtbar
    And er enthält genau die Links "Impressum", "Disclaimer" und "Datenschutz"
    And er enthält keinen Link "Unterstützung"

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

  Szenario: Footer-Modalinhalte sind namespace- und sprachspezifisch
    Given die App wird mit einem anderen Namespace gestartet, z.B. "frankenberg"
    When der Nutzer das Impressum-Modal öffnet
    Then wird der Inhalt aus "locales/frankenberg/de/impressumModalLi.md" geladen
