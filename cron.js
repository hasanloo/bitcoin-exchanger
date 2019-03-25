const cron = require("node-cron");
const request = require('request');
const db = require('./db')
require('dotenv').config()

// schedule tasks to be run on the server
// to fetch latest exchange rate for all currencies
cron.schedule(`*/${process.env.INTERVAL} * * * *`, function() {
    console.log("running a task to fetch currencies");
    request('https://blockchain.info/ticker', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        var currentDateTime = new Date().toLocaleString();
        Object.keys(body).forEach(function(key) {
            const q = 'INSERT INTO rates(time, currency, rate) values($1, $2, $3)'
            const data = [currentDateTime, key, body[key].last]
            db.query(q, data);
        });
    });
    console.log("running task to fetch currencies finished");
});
