const AutoLaunch = require('auto-launch');

module.exports = () => {
  const autoLaunch = new AutoLaunch({ name: 'Volume Manager' });
  autoLaunch.enable();
};

//autoLaunch.disable();

// autoLaunch.isEnabled()
//   .then((isEnabled) => {
//     if (isEnabled) {
//       return;
//     }
//     autoLaunch.enable();
//   })
//   .catch((err) => console.log(err));
