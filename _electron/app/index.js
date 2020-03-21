const { app } = require('electron');

const autoLaunch = require('./services/auto-launch');
const trayIcon = require('./services/tray-icon');
const { createWindow, toggleWindow } = require('./services/window-manager');

let tray = null;

app.on('ready', () => {

  const loggedIn = true;

  // Make sure the app runs on boot
  autoLaunch();

  // Enable tray icon
  trayIcon({ tray, toggleWindow, loggedIn });

  // Create window (in the background)
  createWindow({ loggedIn });

});
