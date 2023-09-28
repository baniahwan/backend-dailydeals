const mysql = require('mysql')

const db = mysql.createConnection({
    host: "bkgntnnc680exhv5pimh-mysql.services.clever-cloud.com",
    user: "uifahzima0rwanpx",
    password: "igiT297Qele9mZrl089L",
    database: "bkgntnnc680exhv5pimh",
    port: 3306
})

module.exports = db