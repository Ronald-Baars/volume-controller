const express = require('express');
const bodyParser = require('body-parser');
const slidersHTML = require('../../pages/sliders');
const storeNewVolumes = require('../../services/storeNewVolumes');

const app = express();
const port = 4375;

app.use(bodyParser.urlencoded({ extended: true }));

console.log(`Volume server running on http://localhost:${port}`)

app.get('/', (req, res) => res.send(slidersHTML()));

app.post('/', (req, res) => {
  storeNewVolumes(req.body);
  res.send(slidersHTML({ saved: true }));
});


app.listen(port);
