const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('common'));

// Please be sure HTTP header X-Frame-Options allows the page to be loaded inside a frame not on the same origin.
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    if (req.method === "OPTIONS") res.send(200);
    else next();
}
app.use(allowCrossDomain);

app.use( '/sender',   express.static('../sender') );
app.use( '/receiver', express.static('../receiver') );
app.use( '/', (req, res) => {
    res.redirect('/sender');
} );

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

