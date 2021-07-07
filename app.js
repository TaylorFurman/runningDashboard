var express = require('express');
var es6Renderer = require('express-es6-template-engine');
var pgp = require('pg-promise')({ });
var axios = require('axios');
const { json } = require('express');
var dbsettings = process.env.DATABASE_URL ||{database: 'vgaimcoc', password: 'LyK0N6ydx5vdmkNT-e8i1i7Wlejo3Hjl', host: 'batyr.db.elephantsql.com', user: 'vgaimcoc'  }
var db = pgp(dbsettings);
var app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const auth_link = 'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'

var auth_url = ('https://www.strava.com/api/v3/athlete/activities?access_token=f927ab67c8e11e9bfe511d481a347b4ff4198ad2');



//calls API data with updated authorization key
app.get('/', async (req, res) => {
try {
  var getAccessToken = await axios.post(auth_link);
  console.log(getAccessToken, "string");
  // var accessToken = getAccessToken.then(({data})=>{ 
  //   res.send(data);
  //    return data; 
  // }); 

  var {data:{access_token}} = getAccessToken;
  console.log("Taylor",access_token);

  // axios.get(auth_url + accestoken)
  //   .then(res => {
  //     var run = res.data; 
  //           let str = JSON.stringify(run);
  //           let fs = require('fs');
  //           fs.writeFile("run_history.json", str, function(error){
  //             if (error){
  //               console.log("Error");
    
  //           }else{
  //               console.log("Success");
  //           }
  //         })
  //         });
  //         res.render('index')
         }
        
  catch (error) {
  console.log(error)
}
});
app.use(express.static('templates'));

function updateDB(){

}









   


























var PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
  });