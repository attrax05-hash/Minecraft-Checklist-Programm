# 🚀 Minecraft Checklist - GitHub Upload & Desktop-App Anleitung

Diese Anleitung zeigt dir Schritt-für-Schritt, wie du die Minecraft Checklist auf GitHub hochlädst und als Desktop-App für Windows, Mac und Linux veröffentlichst.

---

## 📋 Voraussetzungen

1. **GitHub Account**: Kostenlos unter https://github.com/signup
2. **Git installiert**: Herunterladen von https://git-scm.com/download
3. **Node.js installiert**: Herunterladen von https://nodejs.org/
4. **pnpm installiert**: `npm install -g pnpm`

---

## 🔧 Schritt 1: Code von Manus herunterladen

### Option A: Über Manus Management UI (Empfohlen)
1. Öffne die Manus Management UI (rechts oben)
2. Klicke auf **"More (⋯)"** → **"Download as ZIP"**
3. Entpacke die ZIP-Datei auf deinem Computer
4. Öffne Terminal/Kommandozeile und navigiere zum Ordner:
   ```bash
   cd /pfad/zum/minecraft-checklist
   ```

### Option B: Mit Git klonen (wenn bereits auf GitHub)
```bash
git clone https://github.com/DEIN_USERNAME/minecraft-checklist.git
cd minecraft-checklist
```

---

## 📦 Schritt 2: Abhängigkeiten installieren

```bash
pnpm install
```

Dies installiert alle notwendigen Pakete (React, Electron, etc.).

---

## 🔑 Schritt 3: GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. **Repository name**: `minecraft-checklist` (oder ein anderer Name)
3. **Beschreibung**: `Eine Minecraft Item Checklist als Desktop-App mit 1489+ Items`
4. Wähle **"Public"** (damit andere es downloaden können)
5. Klicke **"Create repository"**

---

## 📤 Schritt 4: Code zu GitHub hochladen

### Erste Initialisierung (wenn du den Code gerade heruntergeladen hast):

```bash
# Initialisiere Git
git init

# Füge alle Dateien hinzu
git add .

# Erstelle ersten Commit
git commit -m "Initial commit: Minecraft Checklist mit Electron Desktop-App"

# Füge GitHub Remote hinzu (ersetze USERNAME und REPO-NAME)
git remote add origin https://github.com/USERNAME/minecraft-checklist.git

# Lade zu GitHub hoch
git branch -M main
git push -u origin main
```

### Zukünftige Updates:

```bash
git add .
git commit -m "Beschreibung der Änderungen"
git push
```

---

## 🏗️ Schritt 5: GitHub Actions für automatisierte Builds aktivieren

1. Gehe zu deinem GitHub Repository
2. Klicke auf **"Actions"** Tab
3. Du solltest einen Workflow namens **"Build Electron App"** sehen
4. Klicke auf den Workflow und aktiviere ihn (falls nötig)

**Der Workflow:**
- Wird automatisch bei jedem Push ausgelöst
- Erstellt Builds für Windows (.exe, .msi), macOS (.dmg), Linux (.AppImage, .deb)
- Speichert die Builds als "Artifacts"

---

## 📥 Schritt 6: Releases erstellen

### Automatische Releases (über GitHub Actions):

1. Gehe zu **"Releases"** in deinem Repository
2. Klicke **"Create a new release"**
3. Gib eine **Tag version** ein (z.B. `v1.0.0`)
4. Schreibe eine **Beschreibung** (z.B. "Erste Version mit 1489 Items, Info-Modal, Stacks-System")
5. Klicke **"Publish release"**

GitHub Actions erstellt automatisch die Builds und fügt sie zum Release hinzu.

### Manuelle Builds (lokal):

```bash
# Erstelle Builds für alle Plattformen
pnpm run build

# Erstelle Installer/Packages
pnpm run dist
```

Die fertigen Dateien findest du im `dist/` Ordner:
- `minecraft-checklist-1.0.0.exe` (Windows Installer)
- `minecraft-checklist-1.0.0.msi` (Windows MSI)
- `minecraft-checklist-1.0.0.dmg` (macOS)
- `minecraft-checklist-1.0.0.AppImage` (Linux)
- `minecraft-checklist-1.0.0.deb` (Linux Debian)

---

## 🎮 Schritt 7: Download-Link teilen

### Nutzer können die App so herunterladen:

1. Gehe zu deinem GitHub Repository
2. Klicke auf **"Releases"**
3. Wähle die neueste Version
4. Lade die Datei für dein Betriebssystem herunter:
   - **Windows**: `minecraft-checklist-1.0.0.exe` oder `.msi`
   - **macOS**: `minecraft-checklist-1.0.0.dmg`
   - **Linux**: `minecraft-checklist-1.0.0.AppImage` oder `.deb`

### Installieren:

**Windows:**
- Doppelklick auf `.exe` oder `.msi` → Folge dem Installer

**macOS:**
- Doppelklick auf `.dmg` → Ziehe die App in den Applications Ordner

**Linux:**
- AppImage: `chmod +x minecraft-checklist-1.0.0.AppImage && ./minecraft-checklist-1.0.0.AppImage`
- Debian: `sudo dpkg -i minecraft-checklist-1.0.0.deb`

---

## 🔄 Schritt 8: Updates veröffentlichen

Wenn du Änderungen machst:

```bash
# Ändere den Code
# z.B. neue Items hinzufügen, Bugs fixen

# Commit und Push
git add .
git commit -m "Neue Items hinzugefügt"
git push

# Erstelle neuen Release
# Gehe zu GitHub → Releases → Create new release
# Tag: v1.0.1 (erhöhe die Versionsnummer)
# Beschreibung: Was hat sich geändert?
```

---

## 📋 Checkliste zum Hochladen

- [ ] GitHub Account erstellt
- [ ] Git und Node.js installiert
- [ ] Code heruntergeladen und `pnpm install` ausgeführt
- [ ] GitHub Repository erstellt
- [ ] Code mit `git push` hochgeladen
- [ ] GitHub Actions Workflow aktiviert
- [ ] Erster Release erstellt (v1.0.0)
- [ ] Download-Links getestet
- [ ] Freunden/Community den Link geteilt

---

## 🆘 Häufige Probleme

### Problem: "Git nicht erkannt"
**Lösung**: Git neu installieren und Terminal neu starten

### Problem: "pnpm nicht erkannt"
**Lösung**: 
```bash
npm install -g pnpm
```

### Problem: GitHub Actions Builds schlagen fehl
**Lösung**: 
1. Überprüfe die Logs unter **"Actions"** → **"Build Electron App"**
2. Stelle sicher, dass alle Abhängigkeiten installiert sind
3. Überprüfe die `package.json` auf Fehler

### Problem: Release-Dateien fehlen
**Lösung**: 
1. Warte, bis GitHub Actions fertig ist (grünes Häkchen)
2. Aktualisiere die Release-Seite (F5)
3. Überprüfe unter **"Actions"** ob der Build erfolgreich war

---

## 📚 Weitere Ressourcen

- **GitHub Docs**: https://docs.github.com/
- **Electron Docs**: https://www.electronjs.org/docs
- **GitHub Actions**: https://github.com/features/actions

---

## 🎉 Fertig!

Deine Minecraft Checklist ist jetzt eine echte Desktop-App, die jeder herunterladen und verwenden kann! 🚀

Viel Spaß beim Teilen mit der Community! 🎮
