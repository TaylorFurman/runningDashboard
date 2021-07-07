const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const pgp = require('pg-promise')({ });
const axios = require('axios')
const dbsettings = process.env.DATABASE_URL ||{database: 'vgaimcoc', password: 'LyK0N6ydx5vdmkNT-e8i1i7Wlejo3Hjl', host: 'batyr.db.elephantsql.com', user: 'vgaimcoc'  }
const db = pgp(dbsettings);
const app = express();

app.engine('html', es6Renderer);
app.set('views', 'dbFactory');
app.set('views', 'stravaInfo')
app.set('views', 'templates');
app.set('view engine', 'html', 'css', 'js');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('templates'));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const stravaData =  await new StravaApi().fetchApi();
    console.log(stravaData)
    res.render('index')
  } catch (error) {
    console.log(error)
  }
});
app.post('/runners', async (req, res,) => {
  try {
    const dataResults = req.body
    console.log(dataResults)
    //const results = await new DBFactory().getDB();
    console.log("connected...")
    res.render('runnerName')
  } catch (error) {
    console.log(error)
  }
}); 


// const database = new Datastore('database.db');
// database.loadDatabase();
// app.post('/api', (req, res) => {
//   const data = req.body;
//   database.insert(data)
// })
// run.json({
//   distance: run.distance,
//   type: run.type,
//   start_date: run.start_date,
//   average_speed: run.average_speed,
//   average_heart_rate: run.average_heart_rate,
//   moving_time: run.moving_time,
//   start_latlng: run.start_latlng,
//   end_latlng: run.end_latlng
// })
























var PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
  });