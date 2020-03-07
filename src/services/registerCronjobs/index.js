const CronJob = require('cron').CronJob;
const ajustVolume = require('../ajustVolume');

const job = new CronJob('0 * * * * *', ajustVolume, null, true, 'America/Los_Angeles');
ajustVolume();

job.start();
