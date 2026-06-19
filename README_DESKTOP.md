# 🎮 Minecraft Item Checklist - Desktop App

Eine Desktop-Anwendung zum Verwalten deiner Minecraft-Item-Checkliste mit **1489 echten Minecraft-Block-Icons**.

## 📥 Installation

### Windows
1. Gehe zu [Releases](../../releases)
2. Lade die neueste `.exe` oder `.msi` Datei herunter
3. Doppelklick zum Installieren
4. Die App wird automatisch installiert und startet

### macOS
1. Gehe zu [Releases](../../releases)
2. Lade die neueste `.dmg` Datei herunter
3. Öffne die DMG-Datei
4. Ziehe die App in den Applications-Ordner
5. Starte die App aus dem Applications-Ordner

### Linux
1. Gehe zu [Releases](../../releases)
2. Lade die neueste `.AppImage` oder `.deb` Datei herunter

**Für AppImage:**
```bash
chmod +x Minecraft-Checklist-*.AppImage
./Minecraft-Checklist-*.AppImage
```

**Für .deb (Ubuntu/Debian):**
```bash
sudo dpkg -i minecraft-checklist-*.deb
minecraft-checklist
```

## ✨ Features

- 🔍 **Suchfunktion**: Durchsuche alle 1489 Minecraft-Items
- 🎨 **Echte Icons**: Authentische Minecraft-Block-Texturen
- ✅ **Checkliste**: Markiere Items als erledigt
- 📊 **Fortschrittsanzeige**: Sehe deinen Fortschritt in Echtzeit
- 🏷️ **Kategorien**: Automatische Kategorisierung (Erz, Werkzeuge, Rüstung, etc.)
- 💾 **Lokale Speicherung**: Deine Checkliste wird automatisch gespeichert
- 🌙 **Dark Mode**: Minecraft-authentisches Design

## 🚀 Schnellstart

1. **Item suchen**: Gib einen Item-Namen ein (z.B. "Diamant")
2. **Menge wählen**: Nutze +/- Buttons oder tippe direkt ein
3. **Hinzufügen**: Klicke "ZUR LISTE HINZUFÜGEN"
4. **Abhaken**: Markiere Items als erledigt
5. **Fortschritt sehen**: Der Fortschrittsbalken zeigt deinen Status

## 🛠️ Entwicklung

### Voraussetzungen
- Node.js 20+
- pnpm

### Setup
```bash
git clone https://github.com/YOUR_USERNAME/minecraft-checklist.git
cd minecraft-checklist
pnpm install
```

### Entwicklungsserver
```bash
pnpm run dev:electron
```

### Build für dein System
```bash
# Alle Plattformen
pnpm run dist

# Nur Windows
pnpm run dist:win

# Nur macOS
pnpm run dist:mac

# Nur Linux
pnpm run dist:linux
```

Die gebauten Dateien findest du im `release/` Ordner.

## 📦 Technologie

- **Electron**: Desktop-App Framework
- **React 19**: UI-Framework
- **Tailwind CSS 4**: Styling
- **TypeScript**: Type-safe Development
- **Electron Builder**: App-Packaging

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE)

## 🤝 Beitragen

Contributions sind willkommen! Bitte erstelle einen Fork und einen Pull Request mit deinen Änderungen.

## 💬 Support

Hast du Fragen oder Probleme? Erstelle ein [Issue](../../issues) auf GitHub.

---

**Viel Spaß mit deiner Minecraft-Checkliste!** ⛏️
