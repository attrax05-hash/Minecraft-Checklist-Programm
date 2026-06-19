# 🚀 GitHub Setup Anleitung

Diese Anleitung zeigt dir, wie du das Projekt zu GitHub exportierst und automatisierte Builds einrichtest.

## Schritt 1: GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Gib den Namen ein: `minecraft-checklist`
3. Wähle "Public" (damit andere die App herunterladen können)
4. Klicke "Create repository"

## Schritt 2: Code zu GitHub pushen

```bash
cd /home/ubuntu/minecraft-checklist

# Initialisiere Git (falls nicht schon geschehen)
git init
git add .
git commit -m "Initial commit: Minecraft Checklist Desktop App"

# Verbinde mit deinem GitHub Repository
git remote add origin https://github.com/YOUR_USERNAME/minecraft-checklist.git
git branch -M main
git push -u origin main
```

## Schritt 3: GitHub Actions aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf "Actions" Tab
3. GitHub Actions sollte automatisch erkannt werden
4. Die Workflows sind bereits im `.github/workflows/` Ordner definiert

## Schritt 4: Erste Release erstellen

1. Gehe zu deinem Repository
2. Klicke auf "Releases" (rechts)
3. Klicke "Create a new release"
4. Gib ein Tag ein: `v1.0.0`
5. Titel: `Minecraft Checklist v1.0.0`
6. Beschreibung:
   ```
   🎮 Minecraft Item Checklist Desktop App
   
   ✨ Features:
   - 1489 echte Minecraft-Block-Icons
   - Suchfunktion
   - Checkliste mit Abhaken-Funktion
   - Fortschrittsanzeige
   - Läuft auf Windows, macOS und Linux
   
   📥 Installation:
   - Windows: Lade die .exe oder .msi Datei herunter
   - macOS: Lade die .dmg Datei herunter
   - Linux: Lade die .AppImage oder .deb Datei herunter
   ```
7. Klicke "Publish release"

GitHub Actions wird automatisch die App für alle Plattformen bauen!

## Schritt 5: Warte auf die Builds

1. Gehe zum "Actions" Tab
2. Du siehst einen laufenden Workflow "Build and Release"
3. Warte, bis alle Builds abgeschlossen sind (ca. 10-15 Minuten)
4. Die gebauten Dateien werden automatisch zur Release hinzugefügt

## Schritt 6: Teile dein Projekt

Dein Projekt ist jetzt öffentlich! Teile den Link:
```
https://github.com/YOUR_USERNAME/minecraft-checklist
```

Andere können jetzt:
- Den Code sehen
- Die App herunterladen
- Issues erstellen
- Contributions machen

## 📝 Für zukünftige Updates

Um eine neue Version zu veröffentlichen:

1. Mache deine Änderungen
2. Commit und push:
   ```bash
   git add .
   git commit -m "Beschreibung der Änderungen"
   git push
   ```
3. Erstelle ein neues Release-Tag:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```
4. Gehe zu GitHub und erstelle ein Release für das Tag
5. GitHub Actions baut automatisch die neue Version!

## 🔧 Troubleshooting

### Build schlägt fehl?
- Überprüfe die Logs im "Actions" Tab
- Stelle sicher, dass alle Dependencies installiert sind: `pnpm install`
- Überprüfe, ob `pnpm run build:electron` lokal funktioniert

### Release-Dateien fehlen?
- Warte länger (Builds können 15+ Minuten dauern)
- Überprüfe die Logs im Workflow
- Stelle sicher, dass das Tag korrekt gesetzt ist (z.B. `v1.0.0`)

### Ich kann die App nicht starten?
- Überprüfe, ob du die richtige Version für dein Betriebssystem heruntergeladen hast
- Für Linux: Mache die AppImage ausführbar: `chmod +x Minecraft-Checklist-*.AppImage`
- Für macOS: Erlauben Sie die App in den Sicherheitseinstellungen

## 📚 Weitere Ressourcen

- [Electron Dokumentation](https://www.electronjs.org/docs)
- [GitHub Actions Dokumentation](https://docs.github.com/en/actions)
- [electron-builder Dokumentation](https://www.electron.build/)

---

Viel Erfolg beim Veröffentlichen deiner App! 🚀
