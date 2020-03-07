const data = require('../../../data/volumes.json');
const { exec } = require('child_process');

var OS = process.platform;
const volumeCap = 0.3;
const winMaxVolume = 100;
const macMaxVolume = 10;

const getTargetVolume = function () {
  const date = new Date();
  const currentHour = `${date.getHours()}`;
  const nextHour = `${date.getHours() + 1}`;
  const hourProgress = date.getMinutes() / 60;

  const a = data[currentHour];
  const b = data[nextHour];
  const difference = b - a;

  return a + (difference * hourProgress);
};

module.exports = () => {
  const volume = getTargetVolume() * volumeCap;
  const macCommand = `sudo osascript -e "set Volume ${volume * macMaxVolume}"`;
  const winCommand = `nircmd.exe setsysvolume ${volume * winMaxVolume}`;
  const command = (OS === 'darwin') ? macCommand : winCommand;

  console.log('Changing volume to', volume);
  exec(command);
}
