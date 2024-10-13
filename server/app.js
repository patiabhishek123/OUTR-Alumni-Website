// Set express as Node.js web application
// server framework.

const express = require('express');
const app = express();

// Set EJS as template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // The render method takes the name of the html
    // page to be rendered as input.
    // This page should be in views folder 
    // in the root directory.
    let data = {
        name: 'Swayam',
        hobbies: ['playing football', 'playing chess', 'cycling']
    }

    res.render('home', { data: data });
});

const server = app.listen(4000, function () {
    console.log('listening to port 4000')
});
