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

const auth_link = 'https://www.strava.com/oauth/token?client_id=68038&client_secret=2a40842684ae251d045f93518aa934fef7d8af67&refresh_token=a3eff98359952cd21d262b9abb4e4961e3d72339&grant_type=refresh_token'



// function reAuthorize(){
//   axios.post(auth_link)
//   .then(res=>{
//       var auth = res.data.access_token; 
//       console.log(auth);
//   })

// }

// reAuthorize();



//calls API data with updated authorization key
app.get('/', async (req, res) => {
try {
  axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=569309d1114ee1c78fe966a38bcadc70caae5346')
    .then(res => {
            var run = res.data; 
            let str = JSON.stringify(run);
            let fs = require('fs');
            fs.writeFile("run_history.json", str, function(error){
              if (error){
                console.log("Error");
    
            }else{
                console.log("Success");
            }
          })
          });
    
        
          res.render('index')
        }
        
  catch (error) {
  console.log(error)
}
});
app.use(express.static('templates'));

function updateDB(){

}




   
    //var apiData = await axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=493c5aa0ae8fdcc8810b358edd2b8edf4903e44e')
    //axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=493c5aa0ae8fdcc8810b358edd2b8edf4903e44e')
//     axios.get(`'https://www.strava.com/api/v3/athlete/activities?access_token='+${auth}`)
//     .then(res => {
//       var run = res.data; 
//       let str = JSON.stringify(run);
//       let fs = require('fs');
//       fs.writeFile("run_history", str, function(error){
//         if (error){
//           console.log("Error");

//         }else{
//           console.log("Success");
//         }
//       })
//     });
    
//     res.render('index')
//   } catch (error) {
//     console.log(error)
//   }
// });


// //calls API data with updated authorization key
// app.get('/', async (req, res) => {
//   try {
//     axios.post(auth_link).then(res=>{var auth = res.data.access_token; return auth;}).then(res=>{
      
//     })
//     //var apiData = await axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=493c5aa0ae8fdcc8810b358edd2b8edf4903e44e')
//     //axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=493c5aa0ae8fdcc8810b358edd2b8edf4903e44e')
//     axios.get(`'https://www.strava.com/api/v3/athlete/activities?access_token='+${auth}`)
//     .then(res => {
//       var run = res.data; 
//       let str = JSON.stringify(run);
//       let fs = require('fs');
//       fs.writeFile("run_history", str, function(error){
//         if (error){
//           console.log("Error");

//         }else{
//           console.log("Success");
//         }
//       })
//     });
    
//     res.render('index')
//   } catch (error) {
//     console.log(error)
//   }
// });

























var PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
  });