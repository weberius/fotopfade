# language: de
Feature: Mehrsprachigkeit und Sprachumschaltung

  Als Nutzer der Fotopfade-App
  möchte ich die App in meiner Muttersprache nutzen können,
  damit ich die Inhalte besser verstehen kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"

  Szenario: i18next wird mit Browsersprache initialisiert
    Given der Browser ist auf die Sprache "de-DE" eingestellt
    And der URL-Parameter "lng" ist nicht gesetzt
    When die App geladen wird
    Then initialisiert i18next mit der Sprache "de"
    And lädt die Datei "locales/koeln-muelheim/de/properties.json" als Sprachressource

  Szenario: Schlüssel-Wert-Texte werden aus properties.json aufgelöst
    Given die Datei "locales/koeln-muelheim/de/properties.json" ist geladen
    When updateContent() aufgerufen wird
    Then zeigt der Navigationstitel (brand) den Wert von "brand" aus properties.json
    And zeigen alle UI-Labels (closeBtn, zoom, route, pois, language, about) die übersetzten Werte

  Szenario: Sprachmenü zeigt die im Namespace konfigurierten Sprachen
    Given properties.json enthält den Schlüssel "languages" mit den Werten z.B. ["de"]
    When das Sprachmenü geöffnet wird
    Then werden genau die konfigurierten Sprachen als auswählbare Menüpunkte angezeigt
    And die aktuell aktive Sprache wird kursiv dargestellt

  Szenario: Nutzer wechselt die Sprache über das Navigationsmenü
    Given die App ist in der Sprache "de" geladen
    When der Nutzer im Sprachmenü "english" auswählt
    Then ruft i18next.changeLanguage("en") auf
    And updateContent() wird erneut aufgerufen
    And alle UI-Labels werden in der neuen Sprache angezeigt
    And alle Locale-Fragmente werden neu aus "locales/koeln-muelheim/en/" geladen

  Szenario: Alle Locale-Fragmente werden nach einem Sprachwechsel in der neuen Sprache geladen
    Given die Sprache wird von "de" auf "en" gewechselt
    When updateContent() aufgerufen wird
    Then werden alle ModalBuilder.build()- und ModalBuilder.loadMarkdown()-Aufrufe
      mit dem neuen Sprachcode "en" ausgeführt
    And die Fragmente werden aus dem Pfad "locales/koeln-muelheim/en/" abgerufen

  Szenario: Nicht übersetzte Sprache fällt auf Deutsch zurück
    Given keine Locale-Dateien für die Sprache "ru" sind vorhanden
    When der Nutzer die Sprache auf "ru" wechselt
    Then werden Locale-Fragmente aus der Fallback-Sprache "de" verwendet
