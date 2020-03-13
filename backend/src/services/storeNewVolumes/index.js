var fs = require('fs');

module.exports = (data) => {
  Object.keys(data).forEach((key) => data[key] = parseInt(data[key]) / 20);

  fs.writeFile('data/volumes.json', JSON.stringify(data), (err) => {
    if (err) throw err;
  });

}
