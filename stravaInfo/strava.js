var pgp = require('pg-promise')({ });
var axios = require('axios')


class StravaApi {
    constructor() {
        this.data = []
    }
    fetchApi() {
        axios.get('https://www.strava.com/api/v3/athlete/activities?access_token=d9233fdc26b893840f91051ef2581bf9e4ca1af7')
        .then(res => {
            console.log(res)
        })
    }
}

module.exports = StravaApi
