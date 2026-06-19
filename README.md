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

- **Windows**: [minecraft-checklist-setup.exe](https://github.com/YOUR_USERNAME/minecraft-checklist/releases/latest)
- **macOS**: [minecraft-checklist.dmg](https://github.com/YOUR_USERNAME/minecraft-checklist/releases/latest)
- **Linux**: [minecraft-checklist.AppImage](https://github.com/YOUR_USERNAME/minecraft-checklist/releases/latest)

## Installation

### Windows
1. Lade `minecraft-checklist-setup.exe` herunter
2. Doppelklick auf die Datei
3. Folge dem Installer
4. Fertig! Die App erscheint im Start-Menü

### macOS
1. Lade `minecraft-checklist.dmg` herunter
2. Doppelklick auf die Datei
3. Ziehe die App in den Applications-Ordner
4. Fertig!

### Linux
1. Lade `minecraft-checklist.AppImage` herunter
2. Mache die Datei ausführbar: `chmod +x minecraft-checklist.AppImage`
3. Doppelklick oder `./minecraft-checklist.AppImage`

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

# Build für Desktop
pnpm run dist

# Build für Windows
pnpm run dist:win

# Build für macOS
pnpm run dist:mac

# Build für Linux
pnpm run dist:linux
```

## Lizenz

MIT

## Credits

- Minecraft Icons von [Minecraft Wiki](https://minecraft.wiki/)
- Crafting-Rezepte von [minecraft-craftings.com](https://minecraft-craftings.com/)
