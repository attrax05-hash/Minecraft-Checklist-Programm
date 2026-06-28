# Minecraft Checklist

Eine Desktop-App zum Verwalten deiner Minecraft-Sammlung mit 1886 Items, Crafting-Infos und Höhen-Angaben.

## Features

✅ **1886 Minecraft Items** – Alle Items mit Icons und englischen Namen
✅ **Crafting-Infos** – Biom, Höhe, Herstellung und Links zu Crafting-Rezepten
✅ **Ore-Höhen** – Optimale Y-Koordinaten für alle Ores (Diamond, Iron, Gold, etc.)
✅ **Kategorien** – Filter nach Blöcke, Waffen, Rüstung, Essen, Redstone, Deco
✅ **Fuzzy Search** – Findet Items auch bei Rechtschreibfehlern
✅ **Import/Export** – JSON und Text Export, JSON Import
✅ **Offline** – Funktioniert komplett offline, keine Internet-Verbindung nötig
✅ **Lokale Speicherung** – Deine Checkliste wird lokal gespeichert

## Download

Lade die neueste Version für dein Betriebssystem herunter:

- **Windows**: [Download Setup (EXE)](https://github.com/attrax05-hash/Minecraft-Checklist-Programm/releases/latest/download/Minecraft.Checklist.Setup.1.0.0.exe)
- **Windows (Portable)**: [Download Portable (EXE)](https://github.com/attrax05-hash/Minecraft-Checklist-Programm/releases/latest/download/Minecraft.Checklist.1.0.0.exe)

> **Hinweis:** Da die App noch keine Signatur hat, könnte Windows "Der Computer wurde durch Windows geschützt" anzeigen. Klicke auf "Weitere Informationen" und dann auf "Trotzdem ausführen".

## Installation

### Windows
1. Lade die Setup-Datei herunter
2. Doppelklick auf die Datei
3. Folge dem Installer
4. Fertig! Die App erscheint im Start-Menü

## Verwendung

1. **Items suchen** – Gib den Namen ein (z.B. "diamond" oder "diamand")
2. **Stacks und Items eingeben** – Wähle die Anzahl
3. **Zur Checkliste hinzufügen** – Klick auf den grünen Button
4. **Abhaken** – Markiere Items als erledigt
5. **Info-Popup** – Klick auf das Info-Icon für Crafting-Infos

### Tastenkombinationen
- `Strg+E` – Exportiere als JSON
- `Strg+I` – Importiere JSON
- `Strg+F` – Fokussiere Suchleiste

## Entwicklung

```bash
# Installation
pnpm install

# Development Server
pnpm run dev:electron

# Build für Windows
pnpm run dist:win
```

## Lizenz

MIT

## Credits

- Minecraft Icons von [Minecraft Wiki](https://minecraft.wiki/)
- Crafting-Rezepte von [minecraft-craftings.com](https://minecraft-craftings.com/)
