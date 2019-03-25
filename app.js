const express = require('express')
const db = require('./db')

const app = express()
const port = 3000

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
