const express = require('express');
const fetch = require("node-fetch")
//const StravaApiV3 = require('strava_api_v3')
const es6Renderer = require('express-es6-template-engine');
const pgp = require('pg-promise')({ });
const axios = require('axios')
const Chart = require('chart.js')
const { dirname } = require('path');

var databaseID = process.env.DATABASE_ID;
var databasePassword = process.env.DATABASE_PASSWORD;
var databaseHost = process.env.DATABASE_HOST;
var databaseUser = process.env.DATABASE_USER;
const dbsettings = process.env.DATABASE_URL ||{
database: process.env.DATABASE_ID,
 password: process.env.DATABASE_PASSWORD,
 host: process.env.DATABASE_HOST,
 user: process.env.DATABASE_USER}
const db = pgp(dbsettings);
const app = express();
//require('dotenv').config();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('templates'));
app.use(express.json());


 const auth_link =  'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'

 // const auth_link = 'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'

 var auth_url = ('https://www.strava.com/api/v3/athlete/activities?&access_token=');
// https://www.strava.com/api/v3/athlete/activities?&access_token=



app.get('/app.js', async () => {
 try {
  var getAccessToken = await axios.post(auth_link);
  var {data:{access_token}} = getAccessToken;
  console.log(access_token);
   try{
    await axios.get(auth_url + access_token)
    .then(async res => {
      var run = res.data; 
      await db.any(`INSERT INTO run_data VALUES(DEFAULT, ${run[0].distance},
           '${run[0].type}', 
           '${run[0].start_date}',
           '${run[0].average_speed}', 
           '${run[0].average_heartrate}', 
           '${run[0].moving_time}', 
           '${run[0].start_latlng}', 
           '${run[0].end_latlng}',
           '${run[0].id}',
           '${run[0].map.summary_polyline}')`);      
    });  
  }catch(error){
    console.log(error);
  }
  
}catch(error){
}});



app.get('/runners', async (req, res) => {
  
  db.any(`SELECT * FROM run_data VALUES`) 
  .then(run=>{
    const run_data = JSON.stringify(run);
    //console.log(run_data);
    let fs = require("fs")
    fs.writeFile(__dirname + "/templates/run_history.json", run_data, function(error){
      if (error){
        console.timeLog("Error")
      }else{
        console.log("Success");
      }     
    })
    res.render('runnerinfo')
  })
});


var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});

      
