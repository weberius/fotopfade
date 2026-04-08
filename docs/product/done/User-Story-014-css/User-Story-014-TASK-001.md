# User-Story-014-TASK-001: `assets/css/app.css` – Burger-Menü-Links grau und nicht unterstrichen

## Zugehörige Story
User-Story-014 – Einheitliches Erscheinungsbild der Benutzeroberfläche

## Beschreibung
Alle `<a>`-Elemente in `.navbar-nav` erben Bootstraps Link-Standardfarbe (blau) und `text-decoration: underline`. Die Menüeinträge sollen grau und ohne Unterstrich dargestellt werden; beim Hover werden sie weiß (passend zur dunklen Navbar).

## Technische Details
- Betroffene Datei: `assets/css/app.css`
- Einfügeposition: nach der bestehenden Regel `.navbar .navbar-brand`

## Einzufügender Code

```css
.navbar-nav a {
  color: #6c757d;
  text-decoration: none;
}
.navbar-nav a:hover {
  color: #ffffff;
  text-decoration: none;
}
```

## Schritte
- [x] `assets/css/app.css` öffnen
- [x] Neue Regeln nach `.navbar .navbar-brand { ... }` einfügen
- [x] Prüfen: Burger-Menü öffnen – alle Einträge grau, kein Unterstrich

## Ergebnis
Alle Burger-Menü-Einträge erscheinen grau (`#6c757d`) und ohne Unterstrich. Beim Hover wechseln sie zu Weiß.

## Status
Erledigt

## Aufwand
XS
