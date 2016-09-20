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

connection.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});


app.get('/api/obterSuperiores', function(req, res) {

    connection.query("SELECT * FROM Area_Cutpoint WHERE AreaNome = 'Medidas Cranianas Superiores'", function(err, rows, fields) {
                     
        if (err) {
            console.log('Erro na query:' + err);
            connection.end();
        } else {
            console.log('resultado Medidas Cranianas Superiores:');
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]);
            };
            res.json(
            { 
                Id: rows[0].Id, 
                AreaNome: rows[0].AreaNome, 
                CutPointName: rows[0].CutPointName, 
                Operador: rows[0].Operador, 
                CutPointValor: rows[0].CutPointValor, 
                Feminino: rows[0].Feminino, 
                Masculino: rows[0].Masculino 
            });
        }
    });

});

app.get('/admin', function(req, res) {

    connection.query('SELECT AreaNome FROM Area_Cutpoint LIMIT 1', function(err, rows, fields) {
                     
        if (err) {
            console.log('Erro na query:' + err);
            connection.end();
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
