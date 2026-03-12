# ADR-001: Statische Single-Page-Webapp ohne Backend

**Datum:** 2024  
**Status:** Akzeptiert

---

## Kontext

Die Fotopfade-App soll fotografische Rundgänge mit Karte, POIs und Medieninhalten für Nutzer bereitstellen. Die App muss kostengünstig betreibbar sein, einfach deploybar bleiben und auf mobilen Endgeräten gut funktionieren.

## Entscheidung

Die Webapp wird als vollständig statische Single-Page-Application (SPA) realisiert. Es gibt kein serverseitiges Backend. Alle Daten liegen als statische Dateien (JSON, GeoJSON, Markdown, Bilder) vor und werden direkt vom Browser per `fetch` geladen.

## Alternativen

| Alternative | Bewertung |
|---|---|
| Framework-SPA (React, Vue, Angular) | Erhöhter Aufwand, Build-Pipeline nötig, für die Datenmenge überdimensioniert |
| Server-Side Rendering (Node.js, Java) | Höhere Hosting-Kosten, mehr Komplexität |
| CMS-basierter Ansatz (WordPress o. ä.) | Zu allgemein, schlechte Karten-Integration, höherer Wartungsaufwand |

## Konsequenzen

**Positiv:**
- Hosting auf jedem einfachen Webserver oder CDN möglich (auch GitHub Pages)
- Kein Backend-Deployment, keine Datenbank
- Geringe laufende Kosten
- Einfache Versionierung aller Inhalte via Git

**Negativ:**
- Keine serverseitige Authentifizierung oder Nutzer-Personalisierung
- Alle Daten sind öffentlich zugänglich
- Seitenlogik und Inhaltserstellung liegen beim Entwickler
