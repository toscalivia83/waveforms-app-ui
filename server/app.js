const express = require('express');
const bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
const appConfig = require('./src/config/appConfig.js');
const StethoscopeRecord = require('./src/models/stethoscopeRecord.js');
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup: mongoose
require('./src/services/mongoDB.js').connect(appConfig.mongo.url);

// Database setup: direct mongo client
require('./src/services/mongoDB.js').init(appConfig.mongo.url);

app.get('/audio-annotations', (req, res, next) => {
  return StethoscopeRecord.find()
  .then(results => res.json({audioAnnotations: results}))
  .catch(err => next(new VError("Can\'t get audio annotations")));
})

app.post('/audio-form-results', (req,res) => {
  StethoscopeRecord.create(req.body)
  .then(() => res.send('sent'))
  .catch(err => next(new VError(`can\'t send results for url ${req.body.url}`, err)))
});

app.listen(port, () => console.log(`Listening on port ${port}`));