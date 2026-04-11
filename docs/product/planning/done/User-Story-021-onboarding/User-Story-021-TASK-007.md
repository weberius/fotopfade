# User-Story-021-TASK-007: `locales/*/de/startModalBody.md` – Inhaltsstruktur für alle Routen vereinheitlichen

## Zugehörige Story
User-Story-021 – Onboarding: Optimierung des Start-Modals

## Beschreibung
Die `startModalBody.md`-Dateien aller Routen werden auf die verbindliche Ziel-Struktur gebracht:

**Bild → Audio → Kurztext (max. 60–80 Wörter) → KI-Disclaimer**

Konkret:
- Der `## Hinweis`-Abschnitt mit den vier Navigations-Bullets wird entfernt.
- Die Zwischenüberschrift `## Was kann ich in [Ort] entdecken?` wird entfernt; das Audio-Element folgt direkt nach dem Bild ohne eigene Überschrift.
- Der KI-Disclaimer bleibt als letztes Element erhalten (sofern vorhanden).
- Routen ohne `startModalBody.md` erhalten eine neue Datei nach dem Muster unten, sobald der Einleitungstext extern angeliefert wird.

## Referenz-Implementierung
`locales/koeln-muelheim/de/startModalBody.md` (bereits umgesetzt).

## Ziel-Struktur

```markdown
![Ortsname](./images/<namespace>/start.jpg#pano)

<audio controls class="full-width-audio">
  <source src="locales/<namespace>/de/start.mp3" type="audio/mpeg">
  Dein Browser unterstützt kein Audioelement.
</audio>

[Einleitungstext – max. 60–80 Wörter – wird extern angeliefert]

_Die Inhalte wurden unter Einsatz von KI-Werkzeugen erstellt und sorgfältig überprüft. Vereinzelt können Unstimmigkeiten nicht ausgeschlossen werden._
```

## Zu bearbeitende Dateien

| Route | Datei vorhanden | Aktion |
|---|---|---|
| frankenberg | ✅ | `## Hinweis` + Überschrift entfernen |
| fritzlar | ✅ | `## Hinweis` + Überschrift entfernen |
| koeln-muelheim | ✅ | ✅ bereits erledigt (Prototyp) |
| korbach | ✅ | `## Hinweis` + Überschrift entfernen |
| homberg | ❌ | neue Datei anlegen, sobald Content geliefert |
| koeln-innenstadt | ❌ | neue Datei anlegen, sobald Content geliefert |
| moers | ❌ | neue Datei anlegen, sobald Content geliefert |

## Schritte
- [x] `locales/koeln-muelheim/de/startModalBody.md` – Prototyp (erledigt)
- [x] `locales/frankenberg/de/startModalBody.md` – Struktur angepasst
- [x] `locales/fritzlar/de/startModalBody.md` – Struktur angepasst
- [x] `locales/korbach/de/startModalBody.md` – Struktur angepasst
- [ ] `locales/homberg/de/startModalBody.md` – anlegen, wenn Content vorhanden
- [ ] `locales/koeln-innenstadt/de/startModalBody.md` – anlegen, wenn Content vorhanden
- [ ] `locales/moers/de/startModalBody.md` – anlegen, wenn Content vorhanden

## Status
Teilweise erledigt (homberg, koeln-innenstadt, moers: ausstehend bis Content-Lieferung)

## Aufwand
S
