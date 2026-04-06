# User-Story-011-TASK-010: Contracts aktualisieren – `sidebar-poi-liste.feature` löschen, `poi-marker.feature` bereinigen

## Zugehörige Story
User-Story-011 – Sidebar entfernen

## Beschreibung
Zwei Contract-Dateien unter `docs/product/contracts/` beschreiben Verhalten, das durch diese Story vollständig entfernt wird. Sie müssen aktualisiert werden, damit die Contracts weiterhin den tatsächlichen Zustand der Applikation widerspiegeln.

## Technische Details
- Betroffene Dateien:
  - `docs/product/contracts/sidebar-poi-liste.feature` → **löschen**
  - `docs/product/contracts/poi-marker.feature` → **ein Szenario entfernen**

---

## Änderung 1: `sidebar-poi-liste.feature` löschen

Das gesamte Feature beschreibt ausschließlich die Sidebar: Ein- und Ausblenden, Klick-Navigation, Sortierung, Synchronisierung mit dem Kartenausschnitt. Alle beschriebenen Szenarien werden durch diese Story beseitigt. Eine Contract-Datei für nicht existierende Funktionalität ist irreführend.

```
rm docs/product/contracts/sidebar-poi-liste.feature
```

## Änderung 2: `poi-marker.feature` – Szenario „Mouseover auf POI-Zeile in der Sidebar" entfernen

Das folgende Szenario beschreibt den Mouseover-Handler auf `.feature-row`-Elementen, der in TASK-004 entfernt wird. Nach der Umsetzung der Story wäre dieses Szenario ein dauerhaft fehlschlagendes Test-Szenario.

Zu entfernen aus `poi-marker.feature` (Zeilen 53–57):

```gherkin
  Szenario: Mouseover auf POI-Zeile in der Sidebar hebt Marker hervor
    Given der POI-Layer ist geladen und die Sidebar ist sichtbar
    When der Nutzer mit der Maus über eine POI-Zeile in der Sidebar fährt
    Then wird ein türkiser Hervorhebungsmarker an der Position des POI auf der Karte angezeigt
```

---

## Schritte
- [ ] `docs/product/contracts/sidebar-poi-liste.feature` löschen
- [ ] In `docs/product/contracts/poi-marker.feature` das Szenario „Mouseover auf POI-Zeile in der Sidebar hebt Marker hervor" (inkl. Given/When/Then) entfernen
- [ ] Prüfen: Keine `.feature`-Datei enthält noch Referenzen auf `sidebar`, `list-btn`, `sidebar-hide-btn`, `feature-row` oder `syncSidebar`

## Reihenfolge
Dieser Task sollte **nach Abschluss aller anderen Tasks** dieser Story durchgeführt werden, damit die Contracts den dann tatsächlich implementierten Zustand beschreiben.

## Ergebnis
Die Contract-Dateien sind konsistent mit der Implementierung: Kein Contract beschreibt mehr Sidebar-Funktionalität.

## Status
Offen

## Aufwand
XS
