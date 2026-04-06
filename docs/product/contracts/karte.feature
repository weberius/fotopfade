# language: de
Feature: Interaktive Kartenansicht

  Als Nutzer der Fotopfade-App
  möchte ich eine interaktive Karte sehen, auf der die Route und Sehenswürdigkeiten angezeigt werden,
  damit ich mich beim Erkunden des Fotopfades orientieren kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And die Sprache ist "de"

  Szenario: Kartendarstellung beim App-Start
    When die App vollständig geladen ist
    Then wird eine Leaflet-Karte im DOM-Element "map" angezeigt
    And die Karte verwendet die CartoDB-Kachelschicht als Standard-Basiskarte

  Szenario: Route wird als GeoJSON geladen und auf der Karte dargestellt
    When die App geladen wird
    Then wird eine HEAD-Anfrage an "service/route/koeln-muelheim.geojson" gesendet
    And bei gültiger Antwort wird die GeoJSON-Datei als Linienzug auf der Karte dargestellt
    And der Linienzug erscheint in schwarz

  Szenario: Kartengrenzen passen sich an die Route an
    Given die Route "service/route/koeln-muelheim.geojson" wurde erfolgreich geladen
    When die Kartengrenzen der Route gültig sind
    Then zoomt die Karte automatisch auf die Ausdehnung der Route

  Szenario: Fallback auf Standardroute bei unbekanntem Namespace
    Given der URL-Parameter "id" ist auf einen nicht vorhandenen Namespace gesetzt
    When die HEAD-Anfrage für die Route mit HTTP 404 antwortet
    Then wird die Route aus "service/route/<config.start.id>.geojson" geladen

  Szenario: OpenStreetMap als alternative Kartenebene
    When der Nutzer in der Ebenenauswahl "OpenStreetMap" wählt
    Then wird die OSM-Kachelschicht ("tile.openstreetmap.de") als Basiskarte angezeigt

  Szenario: GPS-Standort des Nutzers auf der Karte anzeigen
    Given die App ist geladen
    When der Nutzer auf den Standort-Control klickt
    Then fragt der Browser nach der Geolokalisierungsberechtigung
    And bei erteilter Berechtigung erscheint ein blauer Punkt an der aktuellen Position auf der Karte
    And es wird ein Genauigkeitskreis um den Standort angezeigt

  Szenario: Klick auf die Karte löscht die Hervorhebung
    Given ein POI ist hervorgehoben
    When der Nutzer auf eine leere Kartenfläche klickt
    Then wird die Hervorhebung des POI entfernt
