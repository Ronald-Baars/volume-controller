const path = require('path');
const { app, Menu, Tray } = require('electron');

module.exports = (tray, toggleWindow) => {

  // Hide the app from the Mac OS dock
  if (app.dock) app.dock.hide();

  // Assign a tray icon
  tray = new Tray(path.join(__dirname, '../icons/icon@2x.png'));

  // Assign a tooltip
  tray.setToolTip('Volume manager');

  tray.on('click', (event) => {
    toggleWindow(tray);
  })
};
