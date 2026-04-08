# User Story: URL-Routing & Pfad-Übersicht

## 6. Intelligentes Routing & Einstiegsseite (Hub)
**Als** Nutzer des Fotopfads  
**möchte ich** beim Aufruf der Basis-URL oder einer ungültigen ID nicht auf einer leeren Seite landen, sondern eine Auswahl aller verfügbaren Touren sehen,  
**damit** ich einfach navigieren kann und sofort erkenne, welche Orte unterstützt werden.

### Akzeptanzkriterien:
* **Default-Verhalten:** Wenn kein `id`-Parameter in der URL vorhanden ist, wird statt der leeren Karte eine Übersicht (Grid) aller verfügbaren Fotopfade angezeigt.
* **Fehler-Handling:** Bei Eingabe einer ungültigen oder nicht existenten ID in der URL erfolgt ein automatischer Fallback auf die Übersichtseite.
* **Visuelle Gestaltung:** Die Übersicht präsentiert die Pfade als anklickbare Karten ("Cards") mit Vorschaubild, Titel und einer kurzen Beschreibung.
* **URL-Struktur:** Das System ist darauf vorbereitet, zukünftig von Parametern (`?id=...`) auf saubere Pfade (`/koeln-muelheim`) oder Hash-Routing (`#/koeln-muelheim`) umgestellt zu werden.
* **Call-to-Action:** Jede Karte in der Übersicht verfügt über einen deutlichen Button (z.B. "Tour starten"), der die Kartenansicht für den gewählten Ort lädt.

### Technischer Hinweis:
Die Weiche zwischen "Karten-Modus" und "Katalog-Modus" muss vor der Initialisierung der Map-Engine (Leaflet/OpenStreetMap) im JavaScript-Lifecycle erfolgen, um Ressourcen-Konflikte zu vermeiden.