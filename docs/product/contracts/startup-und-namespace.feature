# language: de
Feature: App-Start und Namespace-Auflösung

  Als Nutzer der Fotopfade-App
  möchte ich die App mit einem bestimmten Fotopfad aufrufen können,
  damit der richtige Pfad, die richtigen Daten und die richtige Sprache geladen werden.

  Hintergrund:
    Given die Datei "assets/js/config.js" definiert den Standard-Namespace als Literalwert in Zeile 1

  Szenario: App-Start mit Namespace über Hash-Routing (primäre URL-Form, ADR-011)
    Given die App wird aufgerufen mit der URL "index.html#/koeln-muelheim"
    When die App initialisiert wird
    Then wird der Namespace "koeln-muelheim" aus dem URL-Hash "#/koeln-muelheim" gelesen
    And alle Datenpfade verwenden den Namespace "koeln-muelheim"

  Szenario: App-Start ohne Parameter fällt auf Standard-Namespace zurück
    Given die App wird aufgerufen ohne Hash-Pfad und ohne URL-Parameter "id"
    When die App initialisiert wird
    Then wird der in "assets/js/config.js" hinterlegte Standard-Namespace als Literalwert verwendet
    And alle Datenpfade verwenden den konfigurierten Standard-Namespace

  Szenario: Veralteter ?id=-Link wird auf Hash-URL umgeleitet (Abwärtskompatibilität)
    Given die App wird aufgerufen mit der veralteten URL "index.html?id=koeln-muelheim"
    When die App initialisiert wird
    Then leitet "assets/js/app.js" den Browser per window.location.replace auf "index.html#/koeln-muelheim" weiter
    And nach dem Redirect wird der Namespace "koeln-muelheim" aus dem Hash gelesen

  Szenario: Sprachauswahl wird über den URL-Parameter "lng" erzwungen
    Given die App wird aufgerufen mit der URL "index.html#/koeln-muelheim?lng=de"
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
