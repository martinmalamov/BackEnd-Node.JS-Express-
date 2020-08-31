require('dotenv').config()

const env = process.env.NODE_ENV
// const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose')
const config = require('./config/config')[env];
const express = require('express');
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const cubeRouter = require('./routes/cube')
const accessoryRouter = require('./routes/accessory')
const app = express();

console.log('config DB : PORT ---->>> ' , config.port)
console.log('config DB : PrivateKey ---->>> ' , config.privateKey)
console.log('config DB : PASSWORD ---->>> ' , config.databaseUrl)

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
        throw err
    }

    console.log('DB is setup and running')
})

require('./config/express')(app);

app.use('/', authRouter)
app.use('/', cubeRouter)
app.use('/', accessoryRouter)
app.use('/', indexRouter)

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR | Cube Workshop'
    })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));