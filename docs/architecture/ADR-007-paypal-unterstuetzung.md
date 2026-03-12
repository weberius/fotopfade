# ADR-007: PayPal-Link statt Zahlungsformular für Projektunterstützung

**Datum:** 2026-03  
**Status:** Akzeptiert

---

## Kontext

Die Fotopfade-App ist ein freies Projekt. Nutzern soll die Möglichkeit gegeben werden, das Projekt freiwillig finanziell zu unterstützen. Da die App vollständig statisch ist (kein Backend, kein Server), scheiden serverseitige Zahlungsintegrationen aus.

## Entscheidung

Die Unterstützungsfunktion wird über einen **einfachen `<a>`-Link** zu einer PayPal-Donate-URL realisiert:

```
https://www.paypal.com/donate/?hosted_button_id=798KM567KPRFE
```

Der Link öffnet PayPal in einem neuen Tab (`target="_blank"`, `rel="noopener"`). Die Webapp bleibt geöffnet. Ein erklärender Text informiert den Nutzer, dass er die App durch den Klick verlässt und einfach zurückkehren kann.

Die Integration erfolgt über den modalen Dialog „Unterstützung" im Footer, dessen Inhalt aus der Markdown-Datei `bymecoffeeModalLi.md` (je Namespace und Sprache) geladen wird.

Frühere Implementierung (abgelöst): PayPal-Spendenformular via `<form method="post">` – dieser Ansatz würde die Webapp verlassen und wurde durch den Link-Ansatz ersetzt.

## Alternativen

| Alternative | Bewertung |
|---|---|
| `<form>` mit PayPal-Donate-Endpoint | Verlässt die Webapp, löst Seitennavigation aus |
| Ko-fi / Buy me a Coffee | Externer Dienst, kein direkter PayPal-Durchsatz |
| Stripe Elements | Erfordert Backend-Integration, widerspricht ADR-001 |
| Kein Spendenbutton | Kein Einnahmekanal für Projektunterstützung |

## Konsequenzen

**Positiv:**
- Keine Backend-Abhängigkeit, vollständig statisch
- Nutzer verlässt die App nicht im eigentlichen Sinne (neuer Tab)
- Einfach austauschbar – nur der Link muss geändert werden
- PayPal übernimmt die gesamte Zahlungsabwicklung und Datenhaltung

**Negativ:**
- Nutzer verlässt technisch die Webapp-Domain (neuer Tab zu paypal.com)
- Keine Kontrolle über den PayPal-Bezahlprozess
- Datenschutzhinweis erforderlich (wird in `datenschutzLi.md` abgedeckt)
- Rechtlich handelt es sich um freiwillige Zuwendungen ohne Gegenleistung – kein Anspruch auf Spendenquittung (dokumentiert in `disclaimerModalLi.md`)
