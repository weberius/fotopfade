# ADR-012: Modale Dialoge schließen sich nur durch explizite Nutzeraktion

**Datum:** 2026-04  
**Status:** Akzeptiert  
**Umgesetzt in:** User-Story-021

---

## Kontext

Das `#startModal` (Onboarding beim ersten Laden der App) schloss sich bisher
automatisch nach 30 Sekunden via `setTimeout`. Dieses Verhalten erzeugt Druck
beim Erstbesuch und kann dazu führen, dass Inhalte nicht vollständig gelesen
werden – besonders auf langsamen mobilen Geräten.

Gleichzeitig fehlte ein klarer primärer Call-to-Action, der dem Nutzer signalisiert,
was nach dem Lesen des Onboardings zu tun ist.

## Entscheidung

Modale Dialoge in der Fotopfade-App schließen sich **ausschließlich durch
explizite Nutzeraktion**. Automatisches Schließen via `setTimeout` oder ähnliche
Timer-Mechanismen ist nicht zulässig.

Für modale Dialoge mit einer klar definierten Hauptaktion gilt:

- Es gibt genau einen **primären CTA-Button** (`btn-primary`), der die Hauptaktion
  auslöst und das Modal schließt.
- Ein sekundärer **„Schliessen"-Button** (`btn-secondary`, `data-bs-dismiss="modal"`)
  bleibt als neutrale Abbruchoption erhalten.
- Der primäre CTA-Button schließt das Modal **nicht** via `data-bs-dismiss`, sondern
  über einen dedizierten Event-Listener, der die Hauptaktion (z. B. `map.fitBounds()`)
  und das Schließen (`bootstrap.Modal.hide()`) kapselt.

### Anwendung auf `#startModal`

| Button | Klasse | Verhalten |
|---|---|---|
| „Tour starten" (`#start-tour-btn`) | `btn-primary` | `map.fitBounds()` + Modal schließen |
| „Schliessen" | `btn-secondary` | Modal schließen (kein Zoom) |

### Nicht betroffene Modals

Informations-Dialoge ohne Hauptaktion (z. B. `#geschichteModalDiv`, `#fImpressumModal`)
benötigen keinen primären CTA; ihr einziger Button ist der sekundäre „Schliessen"-Button.

## Alternativen

| Alternative | Bewertung |
|---|---|
| `setTimeout` mit längerem Intervall (z. B. 60 s) | Verringert, löst aber nicht das grundlegende Problem |
| Auto-Close per User-Interaktion (Scroll, Klick außerhalb) | Nicht deterministisch, schlechte Barrierefreiheit |
| Kein Schliessen-Button, nur CTA | Verhindert, dass Nutzer das Modal ohne Aktion verlassen können |

## Konsequenzen

**Positiv:**
- Erstbesucher können Onboarding-Inhalte in eigenem Tempo lesen
- Klarer, einladender Einstieg statt zeitmotiviertem Stress
- Einheitliches Muster für zukünftige modale Dialoge mit Hauptaktion
- Barrierefreiheit: Screenreader-Nutzer sind nicht von einem Timer abhängig

**Negativ:**
- Das Modal verbleibt dauerhaft auf dem Bildschirm, bis der Nutzer handelt –
  bei Nutzern, die Modals ignorieren, überlappt es die Karte

## Beziehung zu anderen ADRs

| ADR | Beziehung |
|---|---|
| ADR-001 | Kein Widerspruch; rein clientseitige UI-Entscheidung |
| ADR-004 | CTA-Button-Label wird über i18next lokalisiert (`tourStarten`) |
| ADR-010 | Eigenständige Projekt-Dialoge (ohne Hauptaktion) sind nicht betroffen |
