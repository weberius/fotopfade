# User Story 020 – Rechtssicherheit & Unterstützung

**Als** Entwickler des Fotopfads  
**möchte ich** rechtssichere Pflichtangaben dauerhaft im Footer und eine Unterstützungsmöglichkeit an geeignetem Ort einbinden,  
**damit** ich vor Abmahnungen geschützt bin und Nutzer mir freiwillig eine „Kaffeekasse" finanzieren können.

---

## Hintergrund & Designentscheidung

Der Footer ist semantisch für **Pflichtangaben** reserviert, die gemäß TMG/DSGVO dauerhaft erreichbar sein müssen (Impressum, Disclaimer, Datenschutz). Der Button „Unterstützung" ist ein **freiwilliger Call-to-Action** und gehört nicht in diesen Bereich.

**Empfohlener Ort:** Navbar-Eintrag im Hamburger-Menü
- Konsistent mit allen anderen Einträgen (Geschichte, Über das Projekt, Features, …)
- Gut auffindbar ohne semantische Verwechslung mit Rechtsdokumenten
- Einheitliches UI-Pattern (Icon + Bezeichnung)

**Alternative:** CTA-Button im Modal „Über das Projekt"  
(Nutzer liest über das Projekt → kann es direkt unterstützen; weniger prominent, aber contextually passend)

---

## Akzeptanzkriterien

* Links zu Impressum, Datenschutz und Disclaimer sind dauerhaft **nur im Footer** erreichbar — kein weiterer Eintrag an anderer Stelle.
* Der „Unterstützung"-Link ist **nicht mehr im Footer**, sondern im Navbar-Menü als eigenständiger Eintrag.
* Der Navbar-Eintrag „Unterstützung" öffnet das bestehende Modal `#fCoffeeModal` (wie bisher).
* Das Modal enthält einen externen PayPal-Link, der in einem **neuen Tab** öffnet (kein iFrame).
* Der Begriff „Spende" taucht nirgendwo in der UI auf — nur „Unterstützung" oder „Kaffeekasse" (steuerrechtliche Abgrenzung).
* Die Texte von Impressum, Disclaimer und Datenschutz öffnen sich in **scrollbaren modalen Dialogen**.
* Alle UI-Texte sind i18n-fähig (Schlüssel in den Locale-Dateien vorhanden).

---

## Designentscheidungen (abgeschlossen)

| Frage | Entscheidung |
|---|---|
| Position im Navbar-Menü | Letzter Eintrag |
| Bootstrap-Icon | `bi-heart` |
| CTA-Button in „Über das Projekt" | Nein |

---

## Tasks

- [ ] **T1 – HTML:** `footer-coffee-btn`-Link aus dem `<footer>` entfernen; neuen `<li>`-Eintrag mit `bi-heart`-Icon als letzten Eintrag im Navbar-Menü (`#navbarMenu`) ergänzen.
- [ ] **T2 – JS:** Event-Listener von `footer-coffee-btn` auf neue Navbar-Button-ID umschreiben (z. B. `nav-coffee-btn`).
- [ ] **T3 – CSS:** Footer-Styles prüfen — falls `footer-coffee-btn` eigene Stile hat, aufräumen; ggf. Navbar-spezifische Styles ergänzen.
- [ ] **T4 – Locale:** i18n-Schlüssel für den neuen Navbar-Eintrag in allen vorhandenen Locale-Dateien ergänzen.
- [ ] **T5 – Verifikation:** Manuell prüfen, dass Footer nur noch Impressum, Disclaimer, Datenschutz enthält; Navbar-Eintrag öffnet `#fCoffeeModal`; PayPal-Link öffnet externen Tab.