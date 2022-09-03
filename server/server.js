const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./config/connection');
//const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

const routes = require('./routes');

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});