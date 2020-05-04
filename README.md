# Feebris application

Displays a playable waveform from a stethoscope signals with a form to submit annotations for each sound.

## Getting started

1. Check that you have node and npm install by running `npm -v` and `node -v`, if not, [install node and npm](https://www.npmjs.com/get-npm)
1. Check that you have mongodb installed with the driver, if not [install mongodb](https://www.npmjs.com/package/mongodb)
2. Run `npm install` which will install library dependencies.
3. Run `npm run server` to run the server.
4. Run `npm run start` to run the application and see it displayed on your browser.
5. Run `yarn test` to run the unit test files.


## MongoDB
To look at what is inside your database in dev
1. Run `mongo "mongodb://localhost/dev"`
2. Run `use dev`
3. Then you can run any command like `db.stethoscoperecords.find()`


## Improvements
- Could generate the .dat from the .wav file in Nodejs and save it on the cloud, then use it in the FE, instead of saving them in the public folder.
- Could add express cookie
- Could export the get and post from NodeJs to a routes folder
- Could improve the styling
