const express = require('express')
const cron = require("node-cron");
require('dotenv').config()

const app = express()
const port = 3000

// schedule tasks to be run on the server
cron.schedule(`*/${process.env.INTERVAL} * * * *`, function() {
    console.log("running a task every minute");
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
