//requires
var express = require('express');
var app = express();
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
var connStr = 'mysql://l7ox3rllqlc7ck19:cvyr1h8c0ld6keib@sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/itkqn78npl6fe465';
var connection = mysql.createConnection(connStr);



app.get('/admin', function(req, res) {

    connection.connect(function(err){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });

    connection.query('SELECT AreaNome FROM Area_Cutpoint LIMIT 1', function(err, rows, fields) {
                     
        if (err) {
            console.log('Erro na query:' + err);
        } else {
            var resultado = rows[0].AreaNome;
            console.log('resultado: ' + resultado);
        }
    });

    connection.end();
    res.send('CranioAdmin');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
