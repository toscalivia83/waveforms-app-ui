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

app.get('/lung-sound/:id', async (req, res) => {
  const id = req.params.id;
  res.json({result: 'ok'});
  // return await new Promise((resolve, reject) => {
  //   var file = fs.createWriteStream(`./server/lung-sound_${id}.mp3`);

  //   const request = https.get(
  //     `https://storage.googleapis.com/annotation_tool_feebris/lung_sound_${id}.wav`,
  //     res => res.pipe(file)
  //   );
  //   request.on('error', e => new Error(`Promise rejected: ${e.message}`));
    
  //   request.end;
  //   console.log("HERE1");
  //   resolve();
  //   res.json({result: 'ok'});
  // })
  // .catch(err => console.log("err", err));

  // console.log("HERE2");
  // exec(`audiowaveform -i ./server/lung-sound_${id}.mp3 -o ./server/lung-sound_${id}.dat -b 8`, (error, stdout, stderr) => {
  //   if (error) {
  //       console.log(`error: ${error.message}`);
  //       return;
  //   }
  //   if (stderr) {
  //       console.log(`stderr: ${stderr}`);
  //       return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });

  // res.json({result: 'ok'});
});

app.post('/audio-form-results', (req,res) => {
  StethoscopeRecord.create(req.body)
  .then(() => res.send('sent'))
  .catch(err => next(new VError(`can\'t send results for url ${req.body.url}`, err)))
});

app.listen(port, () => console.log(`Listening on port ${port}`));