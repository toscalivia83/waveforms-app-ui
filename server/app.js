const express = require('express');
const bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
const appConfig = require('./src/config/appConfig.js');
const StethoscopeRecord = require('./src/models/stethoscopeRecord.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup: mongoose
require('./src/services/mongoDB.js').connect(appConfig.mongo.url);

// Database setup: direct mongo client
require('./src/services/mongoDB.js').init(appConfig.mongo.url);

app.get('/lung-sound/:id', (req, res) => {
  const id = req.params.id;
  var file = fs.createWriteStream("file.wav");

  const request = https.get(
    `https://storage.googleapis.com/annotation_tool_feebris/lung_sound_${id}.wav`,
    res => res.pipe(file)
  );
  request.on('error', e => new Error(`Promise rejected:  ${e.message}`));
  request.end();

  res.json({result: 'ok'});
});

app.post('/audio-form-results', (req,res) => {
  StethoscopeRecord.create(req.body)
  .then(() => res.send('sent'))
  .catch(err => next(new VError(`can\'t send results for url ${req.body.url}`, err)))
});

app.listen(port, () => console.log(`Listening on port ${port}`));