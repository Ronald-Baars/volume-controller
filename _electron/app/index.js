const { app } = require('electron');

const autoLaunch = require('./services/auto-launch');
const trayIcon = require('./services/tray-icon');
const { createWindow, toggleWindow } = require('./services/window-manager');

let tray = null;

app.on('ready', () => {

  // Make sure the app runs on boot
  autoLaunch();

  // Enable tray icon
  trayIcon(tray, toggleWindow);

  // Create window (in the background)
  createWindow();

});
