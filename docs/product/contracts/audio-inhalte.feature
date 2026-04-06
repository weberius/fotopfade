# language: de
Feature: Audio-Inhalte in POI-Beschreibungen und Modaldialogen

  Als Nutzer der Fotopfade-App
  möchte ich gesprochene Texte zu Sehenswürdigkeiten und zur Geschichte des Fotopfades hören,
  damit ich Inhalte auch beim Erkunden der Route barrierefrei konsumieren kann.

  Hintergrund:
    Given die App ist gestartet mit dem Namespace "koeln-muelheim"
    And die Sprache ist "de"

  Szenario: POI-Beschreibung enthält ein Audio-Element
    Given die Markdown-Datei "locales/koeln-muelheim/de/p1.md" enthält eine <audio>-Einbettung
    When der Nutzer das Feature-Modal für den POI "Bahnhof Köln-Mülheim" öffnet
    Then wird im Modalinhalt ein HTML5-Audio-Player angezeigt
    And der Audio-Player verweist auf "locales/koeln-muelheim/de/p1.mp3"

  Szenario: Startmodal enthält einen Audio-Player für den Einstiegsinhalt
    Given die Markdown-Datei "locales/koeln-muelheim/de/startModalBody.md" enthält eine <audio>-Einbettung
    When der Nutzer das Startmodal öffnet
    Then wird im Inhalt des Startmodals ein HTML5-Audio-Player angezeigt
    And der Audio-Player verweist auf "locales/koeln-muelheim/de/start.mp3"

  Szenario: Geschichts-Reiter im About-Modal enthält einen Audio-Player
    Given die Markdown-Datei "locales/koeln-muelheim/de/expectModalLi.md" enthält eine <audio>-Einbettung
    When der Nutzer den Reiter "Geschichte" im About-Modal öffnet
    Then wird ein HTML5-Audio-Player mit dem Verweis auf "locales/koeln-muelheim/de/geschichte.mp3" angezeigt

  Szenario: Audio-Player respektiert den vollständigen Pfad aus dem locales-Verzeichnis
    Given eine Markdown-Datei referenziert eine MP3-Datei mit dem relativen Pfad "locales/<namespace>/<lang>/p<nr>.mp3"
    When das HTML aus dem Markdown-Fragment generiert wird
    Then ist der src-Attribut des <source>-Tags ein gültiger relativer Pfad zur MP3-Datei

  Szenario: Browser ohne Audio-Unterstützung zeigt einen Hinweistext
    Given der Browser unterstützt keine HTML5-Audio-Elemente
    When eine POI-Beschreibung mit Audio geladen wird
    Then wird der Fallback-Text "Dein Browser unterstützt kein Audioelement." angezeigt
