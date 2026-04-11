# User-Story-021-TASK-008: Verifikation – Gesamttest aller Änderungen

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Abschließender manueller Browsertest aller in TASK-001 bis TASK-007 umgesetzten Änderungen. Testet werden mindestens zwei Routen (koeln-muelheim als Referenz + eine weitere).

## Abhängigkeiten
TASK-001 bis TASK-007 müssen vollständig abgeschlossen sein.

## Testfälle

### TC-1: Modal öffnet sich automatisch
- [ ] App mit einer Route laden (z. B. `index.html#/koeln-muelheim`)
- [ ] `#startModal` erscheint nach dem Laden der Route automatisch

### TC-2: Modal schließt sich nicht von allein
- [ ] Modal 60 Sekunden offen lassen
- [ ] Modal bleibt sichtbar (kein Auto-Close)

### TC-3: CTA-Button „Tour starten"
- [ ] Primärer Button ist optisch hervorgehoben (Bootstrap `btn-primary`)
- [ ] Klick schließt das Modal
- [ ] Karte zoomt nach dem Schließen auf die gesamte Route (`fitBounds`)

### TC-4: Sekundärer „Schliessen"-Button
- [ ] Klick schließt das Modal
- [ ] Karte verbleibt in aktuellem Zoom (kein `fitBounds`)

### TC-5: Panoramabild vollständig sichtbar
- [ ] Bild füllt die gesamte Breite des Modals
- [ ] Kein Beschnitt oben, unten oder seitlich
- [ ] Kein unerwünschter Weißraum zwischen Modal-Rand und Bild

### TC-6: Inhaltsreihenfolge
- [ ] Reihenfolge im Modal: Bild → Audio → Text → KI-Disclaimer
- [ ] Kein `## Hinweis`-Abschnitt mit Navigations-Bullets sichtbar
- [ ] KI-Disclaimer ist vorhanden

### TC-7: i18n-Label
- [ ] Button-Label zeigt „Tour starten" (deutsch)
- [ ] Hinweis: Alle sieben Routen haben aktuell nur `"languages": ["de"]` – ein Sprachwechsel-Test entfällt, bis eine mehrsprachige Route vorhanden ist. Der i18n-Schlüssel `tourStarten` ist dennoch in allen `properties.json` einzutragen (TASK-006), damit kein Fehler bei zukünftigen Spracherweiterungen entsteht.

### TC-8: Weitere Routen
- [ ] Mindestens eine weitere Route (z. B. `index.html#/korbach`) auf TC-1 bis TC-6 prüfen

## Status
Offen

## Aufwand
S
