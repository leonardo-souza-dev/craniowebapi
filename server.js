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
var connection = mysql.createConnection('mysql://bcadada6a126f7:bfe1febc@us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c?reconnect=true');

connection.connect();
connection.query('SELECT 1 AS EXISTE FROM Area_Cutpoint', function(err, rows, fields) {
                 
    if (err) {
        console.log('***erro na query****');
        throw err;
    } else {
        var resultado = rows[0].EXISTE;
        console.log('resultado: ' + resultado);

        if (!resultado) {
            /*connection.query('CREATE TABLE Area_Cutpoint (Area TINYTEXT, CutPointNome TINYTEXT, Operador TINYTEXT, CutPointValor FLOAT(3,2), Feminino FLOAT(3,2), Masculino FLOAT(3,2) );', function(err, rows, fields) {
                if (err) { 
                    console.log('erro na query de criacao da tabela');
                    throw err; 
                } else {
                    var resultado = rows[0].solution;
                    if (!resultado) {
                        
                    }
                }
            });*/
            console.log('Tabela Area_Cutpoint NÃO existe!!');
        } else {
            console.log('Tabela Area_Cutpoint existe');
        }
    }
});

connection.end();

app.get('/admin', function(req, res) {
    res.send('Admin:' + asd);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});