# User Story 021 – Onboarding: Optimierung des Start-Modals

**Als** Erstbesucher des Fotopfads  
**möchte ich** beim Öffnen der App eine fokussierte, emotionale Einführung sehen, die mich aktiv einlädt, die Tour zu beginnen,  
**damit** ich sofort verstehe, was mich erwartet – ohne durch automatisches Schließen oder überladene Bedienhinweise abgelenkt zu werden.

---

## Hintergrund & Designentscheidungen

Das aktuelle `#startModal` hat zwei strukturelle Schwächen:

1. **Auto-Close nach 30 Sekunden** – Das Modal schließt sich ohne Benutzeraktion.
   Das erzeugt Druck statt Einladung und kann dazu führen, dass Inhalte nicht
   vollständig gelesen werden.
2. **Bedienhinweise im Einstiegs-Modal** – Der `## Hinweis`-Abschnitt
   (Navigation, POI-Icons, About, Gallery …) gehört nicht in das Onboarding.
   Er wird in **User Story 022** in einen separaten Hilfe-Kontext ausgelagert
   und vollständig aus dem `startModal` entfernt.

**Ziel-Aufbau des Modals** (Reihenfolge bindend):

1. Panoramabild – volle Breite, vollständig sichtbar (kein Crop)
2. Audio-Element – Podcast mit zwei Personen, die über die Tour sprechen
3. Kurztext zur Einführung – max. **60–80 Wörter**
4. KI-Disclaimer – _„Die Inhalte wurden unter Einsatz von KI-Werkzeugen erstellt …"_

Der Kurztext wird vom externen Content-Prozess angeliefert. Der Wortrahmen
von **60–80 Wörtern** ist verbindliche Vorgabe für diesen Prozess.

---

## Akzeptanzkriterien

* Das automatische Schließen via `setTimeout` wird aus `app.js` entfernt;
  das Modal bleibt offen, bis der Nutzer aktiv handelt.
* Im Modal-Footer erscheint ein primärer CTA-Button **„Tour starten"**
  (Bootstrap-Klasse `btn-primary`, ID `start-tour-btn`).
* Ein Klick auf „Tour starten" schließt das Modal **und** führt `map.fitBounds(routes.getBounds())` aus (Karte auf die gesamte Route zoomen).
* Der bisherige „Schliessen"-Button bleibt als sekundäre Aktion erhalten.
* Die Reihenfolge im `startModalBody.md` ist stets:
  Panoramabild → Audio → Kurztext → KI-Disclaimer.
* Der Abschnitt `## Hinweis` (Bedienhinweise-Bullets) ist aus allen
  `startModalBody.md`-Dateien entfernt.
* Der KI-Disclaimer bleibt in jeder `startModalBody.md` erhalten.
* Das Panoramabild nimmt die volle Breite des Modals ein und wird
  vollständig (kein Beschnitt) dargestellt.
* Alle neuen UI-Texte sind i18n-fähig; der Schlüssel `tourStarten`
  ist in `properties.json` aller sieben Namespaces vorhanden.
* Die Änderungen gelten für alle sieben Routen:
  frankenberg, fritzlar, homberg, koeln-innenstadt, koeln-muelheim, korbach, moers.

---

## Referenz-Implementierung

Das Ergebnis der Umstrukturierung ist in
`locales/koeln-muelheim/de/startModalBody.md` prototypisch umgesetzt
(siehe Datei). Alle anderen Routen folgen diesem Muster.

---

## Vorgabe Inhaltsstruktur für `startModalBody.md`

```markdown
![Ortsname](./images/<namespace>/start.jpg#pano)

<audio controls class="full-width-audio">
  <source src="locales/<namespace>/de/start.mp3" type="audio/mpeg">
  Dein Browser unterstützt kein Audioelement.
</audio>

[Einleitungstext – **max. 60–80 Wörter** – wird extern angeliefert]

_Die Inhalte wurden unter Einsatz von KI-Werkzeugen erstellt und sorgfältig
überprüft. Vereinzelt können Unstimmigkeiten nicht ausgeschlossen werden._
```

---

## Tasks

- [ ] **T1 – JS (Auto-Close entfernen):** Die beiden `setTimeout`-Aufrufe,
  die `startModal` nach 30 Sekunden verstecken, aus den `fetch()`-Blöcken
  in `app.js` entfernen (zwei Stellen, Zeilen ~170 und ~186).

- [ ] **T2 – HTML (CTA-Button):** Im `#startModal`-Footer den vorhandenen
  „Schliessen"-Button von `btn-secondary` lassen; davor einen neuen
  primären Button einfügen:
  ```html
  <button type="button" class="btn btn-primary" id="start-tour-btn">
    <span id="startTourBtnLabel">Tour starten</span>
  </button>
  ```

- [ ] **T3 – JS (CTA-Logik):** Event-Listener für `start-tour-btn` in
  `app.js` ergänzen:
  ```javascript
  document.getElementById("start-tour-btn").addEventListener("click", function() {
    if (routes.getBounds().isValid()) {
      map.fitBounds(routes.getBounds());
    }
    bootstrap.Modal.getOrCreateInstance(document.getElementById("startModal")).hide();
  });
  ```

- [ ] **T4 – JS/i18n (Label setzen):** In `locale.js` das Label des neuen
  Buttons via i18n setzen:
  ```javascript
  document.getElementById('startTourBtnLabel').innerHTML = i18next.t('tourStarten');
  ```

- [ ] **T5 – CSS (Bild vollständig sichtbar):** Sicherstellen, dass Bilder
  im `#startModalBody` die volle Breite einnehmen und vollständig dargestellt
  werden:
  ```css
  #startModalBody img {
    width: 100%;
    height: auto;
    display: block;
  }
  ```
  Falls die bestehende Regel `.modal-body img { width: 100%; }` ausreicht,
  entfällt diese Änderung; zur Sicherheit prüfen.

- [ ] **T6 – i18n (Schlüssel ergänzen):** Schlüssel `tourStarten` in
  `properties.json` aller sieben Namespaces ergänzen:
  ```json
  "tourStarten": "Tour starten"
  ```

- [ ] **T7 – Content-Restrukturierung (`startModalBody.md`):** Alle
  vorhandenen `startModalBody.md`-Dateien auf die Ziel-Struktur
  (Bild → Audio → Text → Disclaimer) umstellen und den `## Hinweis`-Abschnitt
  entfernen. Routen ohne `startModalBody.md` (homberg, koeln-innenstadt, moers)
  werden nach demselben Muster angelegt, sofern die Content-Lieferung erfolgt
  ist. Referenz: `locales/koeln-muelheim/de/startModalBody.md`.

- [ ] **T8 – Verifikation:** Manuell prüfen:
  - Modal öffnet sich automatisch beim Laden.
  - Modal schließt sich **nicht** von alleine.
  - „Tour starten" schließt Modal und zoomt auf gesamte Route.
  - „Schliessen" schließt Modal ohne Zoom.
  - Panoramabild ist vollständig sichtbar, keine Crops.
  - Kein `## Hinweis`-Abschnitt mit Navigations-Bullets sichtbar.
  - KI-Disclaimer ist vorhanden.
  - Alle sieben Routen zeigen das neue Layout.