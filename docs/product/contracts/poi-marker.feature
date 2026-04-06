# language: de
Feature: POI-Marker auf der Karte

  Als Nutzer der Fotopfade-App
  möchte ich Points of Interest als Marker auf der Karte sehen,
  damit ich die Sehenswürdigkeiten des Fotopfades erkunden kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And die Sprache ist "de"

  Szenario: POIs werden als GeoJSON geladen
    When der POI-Layer initialisiert wird
    Then wird eine HEAD-Anfrage an "service/poi/koeln-muelheim.geojson" gesendet
    And bei gültiger Antwort werden alle Punktobjekte als Marker auf der Karte dargestellt

  Szenario: Marker werden bei niedrigem Zoomlevel geclustert
    Given mehrere POI-Marker liegen nahe beieinander
    When das Zoomlevel unter 16 ist
    Then werden die Marker zu einem Cluster zusammengefasst
    And der Cluster zeigt die Anzahl der enthaltenen Marker an

  Szenario: Clustering wird bei hohem Zoomlevel deaktiviert
    When das Zoomlevel 16 oder höher ist
    Then werden alle Marker einzeln auf der Karte angezeigt und nicht geclustert

  Szenario: POI-Beschreibung wird als Markdown-Fragment bei Laden des Layers abgerufen
    Given ein POI mit der Eigenschaft "id" = "1" ist im GeoJSON enthalten
    When der POI-Layer geladen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/p1.md" gesendet
    And das Markdown wird mit marked.js in HTML konvertiert
    And der konvertierte HTML-Inhalt wird für spätere Anzeige im featureModal vorgehalten

  Szenario: Klick auf einen Marker öffnet das featureModal mit dem POI-Inhalt
    Given der POI-Layer ist geladen
    And die Beschreibung des POI mit ID "1" wurde aus "locales/koeln-muelheim/de/p1.md" geladen
    When der Nutzer auf den Marker des POI "Bahnhof Köln-Mülheim" klickt
    Then wird das featureModal geöffnet
    And die Überschrift des Modals zeigt den POI-Namen "Bahnhof Köln-Mülheim"
    And der Inhalt des Modals zeigt den aus der Markdown-Datei konvertierten HTML-Text
    And der POI wird auf der Karte rosa hervorgehoben

  Szenario: Tooltip erscheint automatisch bei starkem Hereinzoomen
    Given ein POI-Marker ist auf der Karte sichtbar
    When das Zoomlevel 18 oder höher erreicht wird
    Then öffnet sich der Tooltip des Markers automatisch und zeigt den POI-Namen an

  Szenario: Tooltip schließt sich beim Herauszoomen
    Given ein Tooltip eines POI-Markers ist geöffnet
    When das Zoomlevel unter 18 sinkt
    Then schließt sich der Tooltip des Markers

  Szenario: Mouseover auf POI-Zeile in der Sidebar hebt Marker hervor
    Given der POI-Layer ist geladen und die Sidebar ist sichtbar
    When der Nutzer mit der Maus über eine POI-Zeile in der Sidebar fährt
    Then wird ein türkiser Hervorhebungsmarker an der Position des POI auf der Karte angezeigt

  Szenario: Fallback auf Standarddaten bei unbekanntem Namespace
    Given die HEAD-Anfrage für "service/poi/<unbekannt>.geojson" antwortet mit HTTP 404
    Then werden die POIs aus "service/poi/<config.start.id>.geojson" geladen
