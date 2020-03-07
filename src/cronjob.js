const CronJob = require('cron').CronJob;
const { exec } = require('child_process');
const getTargetVolume = require('./services/getTargetVolume.js')
var OS = process.platform;

const ajustVolume = function () {

  const volumeCap = 0.3;
  const volume = getTargetVolume() * volumeCap;

  const winMaxVolume = 65535;
  const winCommand = `nircmd.exe setsysvolume ${volume * winMaxVolume}`;

  const macMaxVolume = 10;
  const macCommand = `sudo osascript -e "set Volume ${volume * macMaxVolume}"`;

  const command = (OS === 'darwin') ? macCommand : winCommand;

  console.log('Changing volume to', volume);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log('exec failed: ', err);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    stdout && console.log(`stdout: ${stdout}`);
    stderr && console.log(`stderr: ${stderr}`);
  });

};

const job = new CronJob('0 * * * * *', ajustVolume, null, true, 'America/Los_Angeles');
ajustVolume();

job.start();
