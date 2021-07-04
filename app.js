var express = require('express');
var es6Renderer = require('express-es6-template-engine');
var pgp = require('pg-promise')({ });
var axios = require('axios')
var dbsettings = process.env.DATABASE_URL ||{database: 'vgaimcoc', password: 'LyK0N6ydx5vdmkNT-e8i1i7Wlejo3Hjl', host: 'batyr.db.elephantsql.com', user: 'vgaimcoc'  }
var db = pgp(dbsettings);
var app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calls API data with updated authorization key
app.get('/', async (req, res) => {
  try {
    //var apiData = await axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=493c5aa0ae8fdcc8810b358edd2b8edf4903e44e')
    axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=493c5aa0ae8fdcc8810b358edd2b8edf4903e44e')
    .then(res => {
      var run = res.data; 
      let str = JSON.stringify(run);
      let fs = require('fs');
      fs.writeFile("run_history", str, function(error){
        if (error){
          console.log("Error");

        }else{
          console.log("Success");
        }
      })
    });
    
    res.render('index')
  } catch (error) {
    console.log(error)
  }
});

























var PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
  });