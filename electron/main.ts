import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Diese Zeilen sind wichtig für moderne Electron-Builds!
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../index.html' )}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Menü-Konfiguration (gekürzt für Übersichtlichkeit)
const template: Electron.MenuItemConstructorOptions[] = [
  { label: 'File', submenu: [{ label: 'Exit', role: 'quit' }] },
  { label: 'Edit', role: 'editMenu' }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
