const path = require('path');
const { app, BrowserWindow } = require('electron');

let trayWindow = null;
let loginWindow = null;

const showWindow = (tray) => {
  const position = getWindowPosition(tray);
  trayWindow.setPosition(position.x, position.y, false);
  trayWindow.show();
}

const getWindowPosition = (tray) => {
  const windowBounds = trayWindow.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)
  return { x: x, y: y }
}

const createWindow = ({ loggedIn }) => {

  trayWindow = new BrowserWindow({
    width: 320,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
  });

  trayWindow.loadURL(`file://${path.join(__dirname, '../views/index.html')}`);

  // Hide the window when it loses focus
  trayWindow.on('blur', () => {
    if (!trayWindow.webContents.isDevToolsOpened()) {
      trayWindow.hide();
    }
  });

  if (!loggedIn) {
    createLoginWindow();
  }
}

const createLoginWindow = () => {

  loginWindow = new BrowserWindow({
    width: 320,
    height: 450,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    titleBarStyle: 'hiddenInset',
    backgroundColor: "#5D73FF"
  });

  loginWindow.loadURL(`file://${path.join(__dirname, '../views/login/index.html')}`);

  loginWindow.on('closed', app.quit);
}

const toggleWindow = ({ tray, loggedIn }) => {
  if (loggedIn) {
    trayWindow.isVisible() ? trayWindow.hide() : showWindow(tray);
  } else {
    loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show();
  }
}

module.exports = {
  createWindow,
  toggleWindow,
};
