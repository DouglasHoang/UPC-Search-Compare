const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');



// Get our api routes
 const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, './')));


// Set our api routes
app.use('/api', api);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
