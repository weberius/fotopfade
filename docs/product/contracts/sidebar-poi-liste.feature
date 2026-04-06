# language: de
Feature: Sidebar mit POI-Liste

  Als Nutzer der Fotopfade-App
  möchte ich eine seitliche Liste der sichtbaren Sehenswürdigkeiten sehen,
  damit ich schnell zu einer bestimmten Sehenswürdigkeit navigieren kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And der POI-Layer ist geladen

  Szenario: Sidebar zeigt nur die im aktuellen Kartenausschnitt sichtbaren POIs
    Given die Karte zeigt einen bestimmten Ausschnitt von "koeln-muelheim"
    When die Kartengrenzen gesetzt sind
    Then zeigt die Sidebar nur die POIs an, deren Koordinaten innerhalb des Kartenausschnitts liegen

  Szenario: Sidebar aktualisiert sich beim Verschieben der Karte
    Given die Sidebar ist geöffnet und zeigt POIs aus einem Kartenausschnitt
    When der Nutzer die Karte verschiebt
    Then aktualisiert sich die Sidebar und zeigt die neu sichtbaren POIs

  Szenario: Klick auf einen POI in der Sidebar zentriert die Karte auf diesen POI
    Given die Sidebar zeigt einen POI-Eintrag
    When der Nutzer auf einen POI-Eintrag in der Sidebar klickt
    Then zoomt die Karte auf das Zoomlevel 20 und zentriert sich auf die Koordinaten des POI
    And das Feature-Modal mit der Beschreibung des POI öffnet sich

  Szenario: Auf kleinen Bildschirmen schließt sich die Sidebar beim Klick auf einen POI
    Given die Bildschirmbreite ist kleiner als 768 Pixel
    And die Sidebar ist sichtbar
    When der Nutzer auf einen POI-Eintrag in der Sidebar klickt
    Then blendet sich die Sidebar aus
    And die Karte wird neu gerendert

  Szenario: Sidebar kann durch Klick auf das Chevron-Symbol ausgeblendet werden
    Given die Sidebar ist sichtbar
    When der Nutzer auf den Button "sidebar-hide-btn" klickt
    Then blendet sich die Sidebar mit einer Animation aus
    And die Karte wird an die neue Größe angepasst

  Szenario: Sidebar kann über den Menüpunkt "POIs" eingeblendet werden
    Given die Sidebar ist ausgeblendet
    When der Nutzer auf den Menüpunkt "POIs" (list-btn) klickt
    Then blendet sich die Sidebar mit einer Animation ein
    And die Karte wird an die neue Größe angepasst

  Szenario: POI-Liste ist nach Nummer sortiert
    Given mehrere POIs mit unterschiedlichen Nummern sind geladen
    When die Sidebar die POI-Liste aufbaut
    Then sind die POI-Einträge aufsteigend nach der Nummer sortiert
