# language: de
Feature: Fotogalerie

  Als Nutzer der Fotopfade-App
  möchte ich eine Galerie mit Fotos des Fotopfades durchstöbern können,
  damit ich die schönsten Bilder der Route in Ruhe betrachten kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"

  Szenario: Galerie-Konfiguration wird beim App-Start geladen
    When die App initialisiert wird
    Then wird eine Anfrage an "service/gallery/koeln-muelheim.json" gesendet
    And die JSON-Antwort enthält eine Liste von Bildobjekten mit "href" und "title"

  Szenario: Klick auf den Galerie-Button öffnet die GLightbox-Galerie
    Given die Galerie-Konfiguration aus "service/gallery/koeln-muelheim.json" ist geladen
    And die GLightbox-Instanz ist initialisiert
    When der Nutzer auf den Menüpunkt "Galerie" (gallery-btn) klickt
    Then öffnet sich die GLightbox-Galerie mit allen Bildern aus der Konfiguration

  Szenario: Galerie zeigt Bilder mit Titel und Copyright-Hinweis
    Given die Galerie ist geöffnet
    When ein Bild angezeigt wird
    Then wird der Titel des Bildes aus der Galerie-Konfiguration angezeigt
    And es wird der Copyright-Hinweis "Copyright © Wolfram Eberius" angezeigt

  Szenario: Navigation in der Galerie ist möglich
    Given die Galerie ist geöffnet und zeigt das erste Bild
    When der Nutzer durch Wischen nach links oder Klick auf "weiter" navigiert
    Then wird das nächste Bild angezeigt

  Szenario: Galerie ist eine Loop-Galerie
    Given die Galerie zeigt das letzte Bild
    When der Nutzer weiter navigiert
    Then wird wieder das erste Bild angezeigt (Loop)

  Szenario: Touch-Navigation ist in der Galerie aktiviert
    Given die Galerie ist auf einem Touch-Gerät geöffnet
    When der Nutzer mit dem Finger nach links wischt
    Then wird das nächste Bild angezeigt
