# language: de
Feature: App-Start und Namespace-Auflösung

  Als Nutzer der Fotopfade-App
  möchte ich die App mit einem bestimmten Fotopfad aufrufen können,
  damit der richtige Pfad, die richtigen Daten und die richtige Sprache geladen werden.

  Hintergrund:
    Given die Datei "assets/js/config.js" definiert "config.start.id" als Standard-Namespace

  Szenario: App-Start mit Namespace über URL-Parameter
    Given die App wird aufgerufen mit der URL "index.html?id=koeln-muelheim"
    When die App initialisiert wird
    Then wird der Namespace "koeln-muelheim" aus dem URL-Parameter "id" gelesen
    And alle Datenpfade verwenden den Namespace "koeln-muelheim"

  Szenario: App-Start ohne URL-Parameter fällt auf Standardkonfiguration zurück
    Given die App wird aufgerufen ohne den URL-Parameter "id"
    When die App initialisiert wird
    Then wird der Namespace aus "config.start.id" gelesen
    And alle Datenpfade verwenden den konfigurierten Standard-Namespace

  Szenario: Sprachauswahl wird über den URL-Parameter "lng" erzwungen
    Given die App wird aufgerufen mit der URL "index.html?id=koeln-muelheim&lng=de"
    When die App initialisiert wird
    Then wird die Sprache auf "de" gesetzt, unabhängig von der Browsersprache

  Szenario: Browsersprache wird automatisch erkannt
    Given der Browser ist auf die Sprache "de-DE" eingestellt
    And der URL-Parameter "lng" ist nicht gesetzt
    When die App initialisiert wird
    Then erkennt i18next-browser-languagedetector die Sprache "de"
    And die App wird in der Sprache "de" angezeigt

  Szenario: Fallback-Sprache bei nicht unterstützter Browsersprache
    Given der Browser ist auf die Sprache "zh" eingestellt
    And die Sprache "zh" ist nicht in den Locale-Dateien vorhanden
    When die App initialisiert wird
    Then wird die Fallback-Sprache "de" verwendet
