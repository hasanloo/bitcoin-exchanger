const express = require('express')
const cron = require("node-cron");
const request = require('request');
const db = require('./db')
require('dotenv').config()

const app = express()
const port = 3000

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

// Get latest bitcoin rate of the currency
app.get('/latest/:currency', async (req, res) => {
    const currency = req.params.currency;
    const q = 'SELECT * FROM rates WHERE currency = $1 ORDER BY time DESC LIMIT 1';
    const data = [currency];
    const {rows} = await db.query(q, data);
    res.json(rows);
})

// Get list of bitcoin rates to the currency
app.get('/range/:currency', async (req, res) => {
    const currency = req.params.currency;
    const from = req.query.from;
    const to = req.query.to;
    const q = 'SELECT * FROM rates WHERE time >= $1 AND time <= $2 AND currency = $3 ORDER BY time ASC';
    const data = [new Date(from), new Date(to), currency];
    const {rows} = await db.query(q, data);
    res.json(rows);
})

app.listen(port, () => console.log(`Exchanger app listening on port ${port}!`))
