const path = require('path');
const { app, Menu, Tray } = require('electron');
const autoLaunch = require('./services/auto-launch');
let tray = null;

app.on('ready', () => {

  // Make sure the app runs on boot
  autoLaunch();

  // Hide the app from the Mac OS dock
  if (app.dock) app.dock.hide();

  // Assign a tray icon
  tray = new Tray(path.join(__dirname, 'icons/icon@2x.png'));

  // Assign a tooltip
  tray.setToolTip('Volume manager');

  // Make sure click events work on windows
  if (process.platform === 'win32') tray.on('click', tray.popUpContextMenu);

  // Create the context menu
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Quit', click() { app.quit(); } }
  ]));
});
