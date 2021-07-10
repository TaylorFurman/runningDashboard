const express = require('express');
const fetch = require("node-fetch")
//const StravaApiV3 = require('strava_api_v3')
const es6Renderer = require('express-es6-template-engine');
const pgp = require('pg-promise')({ });
const axios = require('axios')
const dbsettings = process.env.DATABASE_URL ||{
database:'vgaimcoc',
 password: 'LyK0N6ydx5vdmkNT-e8i1i7Wlejo3Hjl',
 host: 'batyr.db.elephantsql.com',
 user: 'vgaimcoc'  }
const db = pgp(dbsettings);
const app = express();
//require('dotenv').config();

app.engine('html', es6Renderer);
app.set('views', 'dbFactory');
app.set('views', 'stravaInfo')
app.set('views', 'templates');
app.set('view engine', 'html', 'css', 'js');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('templates'));
app.use(express.json());

 const auth_link =  'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'

 // const auth_link = 'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'

//var auth_url = ('https://www.strava.com/api/v3/athlete/activities?=access_token=c78ea1ade287cb4389c1b74fa8c7f85c96b2b591');
// https://www.strava.com/api/v3/athlete/activities?&access_token=



app.get('/app.js', async (req, res) => {
  try {
    console.log("Connected...")
    res.render('index')
  } catch (error) {
    console.log(error)
  }
});
app.post('/runners', async (req, res,) => {
  //const dataResults = req.body
  //console.log(dataResults)
  var getAccessToken = await axios.post(auth_link)
  console.log(getAccessToken, "string");
  var {access_token} = getAccessToken.data;
  console.log("Taylor",access_token);
  var auth_url = (`'https://www.strava.com/api/v3/athlete/activities?&access_token='${access_token}`);
  console.log("Shane", auth_url);
    axios.get(auth_url + access_token)
    .then(res => {
      var runs = res.data; 
      console.log("Taylor", runs)
         runs.map(run => {
           db.any(`INSERT INTO run_data (
            distance, 
            type, 
            start_date, 
            average_speed, 
            average_heart_rate, 
            moving_time, 
            start_latlng, 
            end_latlng
            ) VALUES (
              ${run.distance},
              ${run.type}, 
              ${run.start_date},
              ${run.average_speed}, 
              ${run.average_heart_rate}, 
              ${run.moving_time}, 
              ${run.start_latlng}, 
              ${run.endlatlng})`
            )  
             
        })
    });
    res.render('runnerInfo')
      });
        
//   .catch (error) {
//   console.log(error)
// }
// });

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