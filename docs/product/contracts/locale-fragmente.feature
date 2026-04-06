# language: de
Feature: Laden von Locale-Fragmenten aus dem locales-Verzeichnis

  Als Nutzer der Fotopfade-App
  möchte ich, dass alle Inhalte der modalen Dialoge und der Oberfläche
  in meiner Sprache und bezogen auf den aktuellen Fotopfad angezeigt werden,
  damit die App sprachlich korrekte und pfadbezogene Inhalte zeigt.

  Die Klasse ModalBuilder in assets/js/app.js ist verantwortlich für das bedarfsgesteuerte
  Abrufen (Lazy Loading) von HTML- und Markdown-Fragmenten aus dem Verzeichnis
  locales/<namespace>/<lang>/<dateiname>.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And der Sprachcode ist "de"

  # --- HTML-Fragmente via ModalBuilder.build() ---

  Szenario: HTML-Fragment für die Tab-Kopfzeile des About-Dialogs wird geladen
    When die Methode ModalBuilder.build("aboutTabsHeader", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/aboutTabsHeader.html" gesendet
    And bei erfolgreicher Antwort wird der HTML-Inhalt in das DOM-Element mit der ID "aboutTabsHeader" injiziert
    And die Tab-Kopfzeile zeigt die konfigurierten Reiter (Geschichte, Über das Projekt, Features, QR-Code, Quellen)

  Szenario: HTML-Fragment für den Inhalt des Routen-Modals wird geladen
    When die Methode ModalBuilder.build("routModalBody", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/routModalBody.html" gesendet
    And der HTML-Inhalt wird in das DOM-Element mit der ID "routModalBody" injiziert
    And im DOM-Element ist eine DataTables-Tabelle mit den Spalten "Name", "Zeit", "Entfernung" enthalten

  Szenario: HTML-Fragment für die Leaflet-Attribution wird geladen
    When der Leaflet-Attributions-Control initialisiert wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/leaflet-control-attribution.html" gesendet
    And der HTML-Inhalt wird in den Attributions-Control unten rechts auf der Karte injiziert

  # --- Markdown-Fragmente via ModalBuilder.loadMarkdown() ---

  Szenario: Markdown-Fragment für den Startmodal-Body wird geladen
    When die Methode ModalBuilder.loadMarkdown("startModalBody", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/startModalBody.md" gesendet
    And das Markdown-Fragment wird mit marked.js in HTML konvertiert
    And der HTML-Inhalt wird in das DOM-Element mit der ID "startModalBody" injiziert

  Szenario: Markdown-Fragment für den Geschichts-Reiter (expectModalLi) wird geladen
    When die Methode ModalBuilder.loadMarkdown("expectModalLi", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/expectModalLi.md" gesendet
    And das Markdown wird mit marked.js in HTML konvertiert
    And der HTML-Inhalt wird in das DOM-Element mit der ID "expectModalLi" injiziert

  Szenario: Markdown-Fragment für "Über das Projekt" wird geladen
    When die Methode ModalBuilder.loadMarkdown("aboutModalLi", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/aboutModalLi.md" gesendet
    And der konvertierte HTML-Inhalt wird in das DOM-Element mit der ID "aboutModalLi" injiziert

  Szenario: Markdown-Fragment für den Features-Reiter wird geladen
    When die Methode ModalBuilder.loadMarkdown("featuresModalLi", "de") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/featuresModalLi.md" gesendet
    And der konvertierte HTML-Inhalt wird in das DOM-Element mit der ID "featuresModalLi" injiziert

  Szenario: Footer-Inhalt Impressum wird mit optionalem Dateinamen geladen
    When die Methode ModalBuilder.loadMarkdown("fImpressumLi", "de", "impressumModalLi") aufgerufen wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/impressumModalLi.md" gesendet
    And der konvertierte HTML-Inhalt wird in das DOM-Element mit der ID "fImpressumLi" injiziert

  Szenario: Pfadstruktur aller Locale-Fragmente folgt dem Schema
    Given der Namespace ist "koeln-muelheim" und der Sprachcode ist "de"
    Then haben alle von ModalBuilder geladenen Fragmente den Pfad-Präfix "locales/koeln-muelheim/de/"
    And HTML-Fragmente enden auf ".html"
    And Markdown-Fragmente enden auf ".md"

  Szenario: Fehlerhafter Pfad führt zu leerem Modal ohne sichtbare Fehlermeldung
    Given für ein Fragment existiert keine Datei unter dem erwarteten Pfad
    When ModalBuilder das Fragment abrufen will
    Then antwortet der Server mit HTTP 404
    And das betreffende DOM-Element bleibt leer (kein Inhalt wird gesetzt)
    And ein Fehler wird in der Browser-Konsole protokolliert

  Szenario: POI-Beschreibung wird bedarfsweise pro POI aus dem locales-Verzeichnis geladen
    Given der POI-Layer enthält einen POI mit der Eigenschaft "id" = "5"
    When der POI-Layer initialisiert wird
    Then wird eine HTTP GET-Anfrage an "locales/koeln-muelheim/de/p5.md" gesendet
    And das Markdown wird mit marked.js in HTML konvertiert
    And das HTML wird beim Klick auf den Marker im featureModal angezeigt
