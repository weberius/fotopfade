# User Story: Pfad-basiertes Routing (Clean URLs)

## 8. Umstellung von URL-Parametern auf Pfad-Struktur
**Als** Nutzer der Webapp  
**möchte ich** eine sprechende und lesbare URL in der Adresszeile sehen (z. B. `/koeln-muelheim` statt `?id=koeln-muelheim`),  
**damit** der Link vertrauenswürdig wirkt, einfacher zu teilen ist und ich intuitiv verstehe, welchen Ort ich gerade betrachte.

### Akzeptanzkriterien:
* **Pfad-Erkennung:** Die App extrahiert die Kennung des Fotopfads (Namespace) direkt aus dem URL-Pfad (z. B. `.../fotopfade/koeln-muelheim`).
* **Abwärtskompatibilität:** Bestehende Links mit dem alten Parameter-Format (`?id=...`) werden weiterhin erkannt und automatisch auf die neue Pfad-Struktur umgeleitet (Redirect).
* **Default-Handling:** Wird die Basis-URL ohne Pfad aufgerufen, erfolgt entweder eine Weiterleitung auf den Standard-Pfad oder die Anzeige der Pfad-Übersicht (Hub).
* **GitHub Pages Kompatibilität:** Die Umsetzung erfolgt entweder über physische Unterverzeichnisse mit eigener `index.html` oder über ein clientseitiges Routing-Skript (ggf. unter Nutzung von Hash-Routing `#/`, falls Server-Konfigurationen nicht möglich sind).
* **Zustandserhalt:** Das Neuladen der Seite (Refresh) führt nicht zu einem 404-Fehler, sondern lädt korrekt den entsprechenden Pfad.

### Technischer Hinweis:
Da GitHub Pages standardmäßig keine serverseitige Umleitung für virtuelle Pfade unterstützt, sollte geprüft werden, ob eine `404.html`-Hack-Lösung oder das stabilere Hash-Routing (`index.html#/ort`) für dieses Projekt am effizientesten ist.

## technische Hinweise

Wichtig für GitHub Pages: Damit das reibungslos funktioniert, ohne für jeden Ort Ordner anzulegen, könntest du den Hash-Pfad nutzen:
https://weberius.github.io/fotopfade/#/koeln-muelheim
Das funktioniert auf GitHub Pages sofort, ohne 404-Konfiguration, und bietet fast die gleichen UX-Vorteile wie der echte Pfad.

``` javascript
// Aktuellen Pfad auslesen (z.B. "/fotopfade/koeln-muelheim")
const path = window.location.pathname;
const pathSegments = path.split('/').filter(segment => segment.length > 0);

// Wenn der letzte Teil des Pfads nicht "fotopfade" ist, nehmen wir ihn als ID
let namespace;

if (pathSegments.length > 1) {
    namespace = pathSegments[pathSegments.length - 1];
} else {
    // Falls nur die Basis-URL aufgerufen wird: Weiterleitung oder Default
    namespace = "koeln-muelheim"; // Dein Default
    // Optional: URL im Browser "hübsch" machen ohne Reload
    window.history.replaceState(null, "", window.location.pathname + namespace);
}

console.log("Gewählter Pfad:", namespace);
```

