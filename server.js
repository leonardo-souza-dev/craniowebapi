var http = require('http');
var mysql      = require('mysql');
var connection = mysql.createConnection('mysql://bcadada6a126f7:bfe1febc@us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c?reconnect=true');
/*
var connection = mysql.createConnection({
                                        host     : 'us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c',
                                        user     : 'bcadada6a126f7',
                                        password : 'bfe1febc'
                                        });
 */
//mysql://bcadada6a126f7:bfe1febc@us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c?reconnect=true
connection.connect();
var asd = 'asd';
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
                 
                 if (err) {
                     console.log('E N T R O U   N O   E R R O  ');
                     throw err;
                 } else {
                     console.log('---nao deu erro--');
                     asd = rows[0].solution;
                     console.log('The solution is: ', rows[0].solution);
                 }
});

connection.end();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n' + asd);
}).listen();