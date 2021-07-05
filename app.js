//const nameSearch = document.getElementById('button')
var express = require('express');
var es6Renderer = require('express-es6-template-engine');
var pgp = require('pg-promise')({ });
var axios = require('axios')
var dbsettings = process.env.DATABASE_URL ||{database: 'vgaimcoc', password: 'LyK0N6ydx5vdmkNT-e8i1i7Wlejo3Hjl', host: 'batyr.db.elephantsql.com', user: 'vgaimcoc'  }
var db = pgp(dbsettings);
var app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html', 'css', 'js');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('templates'));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    //var apiData = await axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=1954b6e4f8aefe7aeaae500e8b220d3d23e8f3ec')
    //console.log(apiData)
    res.render('index')
  } catch (error) {
    console.log(error)
  }
});
app.get('/runners', async (req, res,) => {
  try {
    //const runners =  await db.any(`SELECT * FROM run_data`)
    res.render('runnerName')
  } catch (error) {
    console.log(error)
  }
})

























var PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
  });