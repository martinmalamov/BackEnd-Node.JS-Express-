const handlebars = require('express-handlebars');
const express = require('express');

module.exports = (app) => {

    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }))

    app.set('view engine', '.hbs')

    //TODO: Setup the static files
    app.use('/static', express.static('static'))

};