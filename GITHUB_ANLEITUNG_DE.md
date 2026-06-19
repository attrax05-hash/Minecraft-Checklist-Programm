# 📚 Vollständige Anleitung: Minecraft Checklist auf GitHub hochladen

Diese Anleitung zeigt dir **Schritt für Schritt**, wie du die Minecraft Checklist auf GitHub hochlädst und andere Nutzer sie installieren können.

---

## 🎯 Überblick: Was wir machen

1. **GitHub Account erstellen** (falls noch nicht vorhanden)
2. **Neues Repository erstellen** auf GitHub
3. **Code hochladen** mit Git
4. **Releases erstellen** mit automatischen Builds
5. **Anderen den Link teilen** zum Herunterladen

---

## 📋 Voraussetzungen

- **GitHub Account**: https://github.com (kostenlos!)
- **Git installiert**: https://git-scm.com/download
- **Der Minecraft Checklist Code** (den du bereits hast)

### Git installieren (falls noch nicht vorhanden)

**Windows:**
1. Gehe zu https://git-scm.com/download/win
2. Lade den Installer herunter
3. Führe den Installer aus und folge den Anweisungen
4. Öffne Terminal/PowerShell und tippe: `git --version`

**macOS:**
1. Öffne Terminal
2. Tippe: `xcode-select --install`
3. Folge den Anweisungen

**Linux:**
```bash
sudo apt-get install git
```

---

## 🚀 Schritt 1: GitHub Account erstellen

1. Gehe zu https://github.com
2. Klicke auf **"Sign up"** (oben rechts)
3. Gib ein:
   - **Email**: Deine E-Mail-Adresse
   - **Password**: Ein sicheres Passwort
   - **Username**: Dein Benutzername (z.B. `dein-name`)
4. Bestätige die Captcha
5. Klicke **"Create account"**
6. Bestätige deine E-Mail-Adresse

✅ Du hast jetzt einen GitHub Account!

---

## 📁 Schritt 2: Neues Repository erstellen

1. Melde dich auf GitHub an
2. Klicke auf das **"+"** Symbol (oben rechts)
3. Wähle **"New repository"**
4. Fülle die Felder aus:

| Feld | Wert |
|------|------|
| **Repository name** | `minecraft-checklist` |
| **Description** | `🎮 Minecraft Item Checklist - Desktop App mit 1489 Items` |
| **Public/Private** | **Public** (damit andere es sehen können) |
| **Add a README file** | ✓ Ankreuzen |
| **Add .gitignore** | Wähle "Node" |
| **Choose a license** | "MIT License" |

5. Klicke **"Create repository"**

✅ Dein Repository wurde erstellt!

---

## 💻 Schritt 3: Code hochladen mit Git

### 3.1 Terminal/PowerShell öffnen

**Windows:**
- Drücke `Windows + R`
- Tippe `cmd` oder `powershell`
- Drücke Enter

**macOS/Linux:**
- Öffne Terminal

### 3.2 Zum Projekt-Verzeichnis navigieren

```bash
cd /home/ubuntu/minecraft-checklist
```

(Oder wo dein Projekt gespeichert ist)

### 3.3 Git konfigurieren (nur beim ersten Mal)

```bash
git config --global user.name "Dein Name"
git config --global user.email "deine-email@example.com"
```

Ersetze `Dein Name` und `deine-email@example.com` mit deinen Daten.

### 3.4 Git initialisieren und Code hochladen

```bash
# Initialisiere das lokale Git-Repository
git init

# Füge alle Dateien hinzu
git add .

# Erstelle einen Commit
git commit -m "Initial commit: Minecraft Checklist Desktop App"

# Verbinde mit GitHub (ersetze USERNAME mit deinem GitHub-Benutzernamen)
git remote add origin https://github.com/USERNAME/minecraft-checklist.git

# Benenne den Branch um (GitHub verwendet jetzt 'main' statt 'master')
git branch -M main

# Lade den Code zu GitHub hoch
git push -u origin main
```

**Beim `git push` wirst du nach deinen GitHub-Zugangsdaten gefragt:**
- **Username**: Dein GitHub-Benutzername
- **Password**: Dein GitHub-Passwort (oder Personal Access Token)

✅ Dein Code ist jetzt auf GitHub!

---

## 🔑 Schritt 3b: Personal Access Token (Alternative zu Passwort)

Falls das Passwort nicht funktioniert, erstelle einen Personal Access Token:

1. Gehe zu https://github.com/settings/tokens
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. Gib einen Namen ein: `minecraft-checklist`
4. Wähle diese Scopes aus:
   - ✓ `repo` (vollständiger Zugriff auf Repositories)
   - ✓ `workflow` (GitHub Actions)
5. Klicke **"Generate token"**
6. **Kopiere den Token** (du siehst ihn nur einmal!)
7. Verwende diesen Token statt deinem Passwort beim `git push`

---

## 📦 Schritt 4: Releases erstellen (automatische Builds)

### 4.1 GitHub Actions aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf den **"Actions"** Tab
3. Du solltest sehen: "Workflows are disabled for this repository"
4. Klicke **"I understand my workflows, go ahead and enable them"**

✅ GitHub Actions ist jetzt aktiviert!

### 4.2 Erste Release erstellen

1. Gehe zu deinem Repository
2. Klicke auf **"Releases"** (rechts in der Sidebar)
3. Klicke **"Create a new release"**
4. Fülle die Felder aus:

| Feld | Wert |
|------|------|
| **Choose a tag** | `v1.0.0` |
| **Release title** | `Minecraft Checklist v1.0.0` |
| **Describe this release** | Siehe unten |

**Beschreibungstext:**
```
🎮 Minecraft Item Checklist - Desktop App

✨ Features:
- 1489 echte Minecraft-Block-Icons
- Suchfunktion für alle Items
- Abhakbare Checkliste
- Fortschrittsanzeige
- Lokale Speicherung (Daten bleiben erhalten)
- Export-Funktion (JSON & Text)
- Läuft auf Windows, macOS und Linux

📥 Installation:
- Windows: Lade die .exe oder .msi Datei herunter
- macOS: Lade die .dmg Datei herunter  
- Linux: Lade die .AppImage oder .deb Datei herunter

🎮 Schnellstart:
1. App starten
2. Item suchen (z.B. "Diamant")
3. Menge wählen
4. "ZUR LISTE HINZUFÜGEN" klicken
5. Item abhaken wenn erledigt
6. Fortschritt sehen!

💾 Daten speichern:
- Alle Items werden automatisch gespeichert
- Exportiere deine Checkliste als JSON oder Text
- Teile deine Liste mit anderen Spielern
```

5. Klicke **"Publish release"**

✅ Release erstellt! GitHub Actions startet jetzt die Builds...

### 4.3 Warte auf die Builds

1. Gehe zum **"Actions"** Tab
2. Du siehst einen Workflow "Build and Release"
3. **Warte 10-15 Minuten** bis alle Builds fertig sind
4. Du siehst grüne ✓ Häkchen wenn alles erfolgreich war

### 4.4 Download-Links überprüfen

1. Gehe zurück zu **"Releases"**
2. Klicke auf deine Release `v1.0.0`
3. Du siehst die Download-Links:
   - `minecraft-checklist-windows.zip` (Windows)
   - `minecraft-checklist-macos.zip` (macOS)
   - `minecraft-checklist-linux.zip` (Linux)

✅ Die App ist jetzt zum Download bereit!

---

## 🌍 Schritt 5: Link teilen

Dein Projekt ist jetzt öffentlich! Teile diesen Link mit anderen:

```
https://github.com/DEIN-USERNAME/minecraft-checklist
```

Andere können jetzt:
- ✅ Den Code sehen
- ✅ Die App herunterladen und installieren
- ✅ Issues erstellen (Fehler melden)
- ✅ Contributions machen (Code verbessern)

---

## 🔄 Schritt 6: Updates veröffentlichen

Wenn du Änderungen machst und eine neue Version veröffentlichen möchtest:

### 6.1 Änderungen hochladen

```bash
# Navigiere zum Projekt
cd /home/ubuntu/minecraft-checklist

# Füge Änderungen hinzu
git add .

# Erstelle einen Commit
git commit -m "Beschreibung der Änderungen (z.B. 'Fix: Icon-Anzeige')"

# Lade zu GitHub hoch
git push
```

### 6.2 Neue Release erstellen

```bash
# Erstelle ein neues Tag
git tag v1.1.0

# Lade das Tag zu GitHub hoch
git push origin v1.1.0
```

Oder manuell auf GitHub:
1. Gehe zu **"Releases"**
2. Klicke **"Create a new release"**
3. Wähle das neue Tag `v1.1.0`
4. Gib eine Beschreibung ein
5. Klicke **"Publish release"**

GitHub Actions baut automatisch die neue Version!

---

## 🆘 Troubleshooting

### Problem: "fatal: not a git repository"

**Lösung:**
```bash
cd /home/ubuntu/minecraft-checklist
git init
```

### Problem: "Permission denied (publickey)"

**Lösung:**
1. Verwende HTTPS statt SSH:
```bash
git remote set-url origin https://github.com/USERNAME/minecraft-checklist.git
```
2. Oder erstelle einen Personal Access Token (siehe Schritt 3b)

### Problem: Build schlägt fehl

**Lösung:**
1. Gehe zum **"Actions"** Tab
2. Klicke auf den fehlgeschlagenen Workflow
3. Schaue dir die Logs an
4. Häufige Fehler:
   - Fehlende Dependencies: `pnpm install`
   - TypeScript-Fehler: `pnpm run check`
   - Build-Fehler: `pnpm run build:electron`

### Problem: Ich kann die App nicht starten

**Für Windows:**
- Überprüfe ob du die richtige Version (x64 oder x32) heruntergeladen hast
- Windows Defender könnte die App blockieren → "Trotzdem ausführen"

**Für macOS:**
- Öffne Systemeinstellungen → Sicherheit & Datenschutz
- Erlaube die App unter "Geöffnete Apps von unbekannten Entwicklern"

**Für Linux:**
- Mache die AppImage ausführbar:
```bash
chmod +x Minecraft-Checklist-*.AppImage
./Minecraft-Checklist-*.AppImage
```

---

## 📚 Weitere Ressourcen

- **Git Dokumentation**: https://git-scm.com/doc
- **GitHub Dokumentation**: https://docs.github.com
- **Electron Dokumentation**: https://www.electronjs.org/docs
- **GitHub Actions**: https://docs.github.com/en/actions

---

## ✅ Checkliste zum Abschluss

- [ ] GitHub Account erstellt
- [ ] Repository auf GitHub erstellt
- [ ] Code mit `git push` hochgeladen
- [ ] GitHub Actions aktiviert
- [ ] Erste Release `v1.0.0` erstellt
- [ ] Builds erfolgreich (grüne ✓)
- [ ] Download-Links funktionieren
- [ ] Link mit anderen geteilt
- [ ] Erste Nutzer haben die App installiert 🎉

---

## 🎉 Glückwunsch!

Du hast deine Minecraft Checklist Desktop App erfolgreich auf GitHub veröffentlicht! 

Jetzt können **alle Nutzer** deine App herunterladen und verwenden. 🚀

---

**Viel Erfolg mit deinem Projekt!** ⛏️

Bei Fragen oder Problemen: Erstelle ein Issue auf GitHub!
