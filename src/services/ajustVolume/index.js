const { exec } = require('child_process');
const getTargetVolume = require('../getTargetVolume');

const OS = process.platform;
const volumeCap = 0.25;
const winMaxVolume = 100;
const macMaxVolume = 10;
const progressBarLength = 30;

module.exports = () => {
  const targetVolume = getTargetVolume();

  // Generate the command to fire to the OS
  const volume = targetVolume * volumeCap;
  const macCommand = `sudo osascript -e "set Volume ${Math.round(volume * macMaxVolume)}"`;
  const winCommand = `setvol ${Math.round(volume * winMaxVolume)}`;
  const command = (OS === 'darwin') ? macCommand : winCommand;
  exec(command);

  // Create a visual progress bar to log
  let progress = '';

  for (let i = 0; i < progressBarLength; i++) {
    progress += (targetVolume * progressBarLength) > i ? '◼' : '◻';
  }

  console.log(`${progress} ${Math.round(targetVolume * 100)}%`);
}
