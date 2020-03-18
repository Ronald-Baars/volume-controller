const express = require('express');
const bodyParser = require('body-parser');

const port = 8954;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create the contact endpoint
app.post(`/api/login`, (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

console.log(`🤞  Server is running on http://localhost:${port}`);

app.listen(port);
