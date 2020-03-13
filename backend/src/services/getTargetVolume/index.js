const data = require('../../../data/volumes.json');

module.exports = function () {
  const date = new Date();
  const currentHour = `${date.getHours()}`;
  const nextHour = `${date.getHours() + 1}`;
  const hourProgress = date.getMinutes() / 60;

  const a = data[currentHour];
  const b = data[nextHour];
  const difference = b - a;

  return a + (difference * hourProgress);
};
