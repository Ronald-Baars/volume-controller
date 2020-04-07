const express = require('express');
const bodyParser = require('body-parser');

const { login, ping, register } = require('./endpoints');

const port = 8954;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create the API endpoints
app.post(`/api/ping`, ping);
app.post(`/api/login`, login);
app.get(`/api/login`, register);

console.log(`🤞  Server is running on http://localhost:${port}`);

app.listen(port);
