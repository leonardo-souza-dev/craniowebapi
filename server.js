var mysql      = require('mysql');
var connection = mysql.createConnection({
                                        host     : 'us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c',
                                        user     : 'bcadada6a126f7',
                                        password : 'bfe1febc'
                                        });
//mysql://bcadada6a126f7:bfe1febc@us-cdbr-iron-east-04.cleardb.net/heroku_9295fbed090e56c?reconnect=true
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
                 if (err) throw err;
                 console.log('The solution is: ', rows[0].solution);
                 });

connection.end();