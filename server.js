//requires
var express  = require('express');
var app      = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var url = require('url');
var http = require('http');
var mysql = require('mysql');

//configs
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

var connection = mysql.createConnection('mysql://bcadada6a126f7:bfe1febc@us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c?reconnect=true');
connection.connect();

asd = 'qwe';
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
                 
    if (err) {
        console.log('E N T R O U    N O    E R R O  ');
        throw err;
    } else {
        console.log('***** nao deu erro *****');
        asd = rows[0].solution;
        console.log('The solution is: ', rows[0].solution);
    }
});

connection.end();


console.log('A SOLUCAO EH: ', asd);

app.get('/admin', function(req, res) {
    res.send('Admin:' + asd);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});