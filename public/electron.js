const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the local HTML file.
  const indexPath = `file:\\${path.join(__dirname, '../build/index.html')}`
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(indexHtml)}`);
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
    createWindow()
   
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
