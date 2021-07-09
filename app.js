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



//client_id & client_secret need to be interchangeable for multiple runners (send to database)
const auth_link = 'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'


//Example of access token var auth_url = ('https://www.strava.com/api/v3/athlete/activities?&access_token=f927ab67c8e11e9bfe511d481a347b4ff4198ad2');
var auth_url = ('https://www.strava.com/api/v3/athlete/activities?&access_token=');



//var auth_url = ('https://www.strava.com/api/v3/athlete/activities?=access_token=c78ea1ade287cb4389c1b74fa8c7f85c96b2b591');
// https://www.strava.com/api/v3/athlete/activities?&access_token=



//calls API data with updated authorization key
app.get('/app.js', async (req, res) => {
 try {
   var getAccessToken = await axios.post(auth_link);
   console.log(getAccessToken, "string");
  // var accessToken = getAccessToken.then(({data})=>{ 
    // res.send(data);
    // return data; 
   //}); 

   var {data:{access_token}} = getAccessToken;
  //console.log(access_token);

var data = await db.query('SELECT * FROM run_data');
//res.send(data);

   try{
    await axios.get(auth_url + access_token)
   
    .then(res => {
     var runs = res.data; 
    console.log("Taylor", runs)
  //  runs.map(async(run) => {
  //        await db.none(`INSERT INTO run_data (distance,type,start_date, average_speed, average_heart_rate, moving_time,  start_latlng, end_latlng) VALUES(${run.distance},
  //         ${run.type}, 
  //         ${run.start_date},
  //         ${run.average_speed}, 
  //         ${run.average_heart_rate}, 
  //         ${run.moving_time}, 
  //         ${run.start_latlng}, 
  //         ${run.endlatlng})`);  
  //    });
});  
 }catch(error){
 console.log(error);
 }
 
 }catch(error){

 }});

app.use(express.static('templates'));

function updateDB(){

}
 


var PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
  });