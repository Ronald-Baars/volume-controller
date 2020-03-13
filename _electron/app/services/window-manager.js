const path = require('path');
const { BrowserWindow } = require('electron');

let window = null;

const showWindow = (tray) => {
  const position = getWindowPosition(tray);
  window.setPosition(position.x, position.y, false);
  window.show();
}

const getWindowPosition = (tray) => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)
  return { x: x, y: y }
}

const createWindow = () => {
  window = new BrowserWindow({
    width: 320,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true
  });
  window.loadURL(`file://${path.join(__dirname, '../interface/index.html')}`);

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
}

const toggleWindow = (tray) => {
  window.isVisible() ? window.hide() : showWindow(tray);
}

module.exports = {
  createWindow,
  toggleWindow,
};
