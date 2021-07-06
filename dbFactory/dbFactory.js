var pgp = require('pg-promise')({ });

class DBFactory {
    constructor() {
        this.db.settings = {database: 'vgaimcoc', password: 'LyK0N6ydx5vdmkNT-e8i1i7Wlejo3Hjl', host: 'batyr.db.elephantsql.com', user: 'vgaimcoc'  }
        this.db = pgp(this.dbsettings);
    }
    async getDB() {
        return await db.query(`SELECT * FROM run_data`)
    }
}





module.exports = DBFactory