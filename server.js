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

//implementacao parcial
app.post('/api/obterGenero', function(req, res) {
		
	var valor = req.body.valor;
	var areaNome = req.body.area_nome;
	var cutPointNome = req.body.cut_point_nome;
	
	var query = " SELECT GERAL2.* " + 
				" FROM ( " + 
					" SELECT " + 
						" B.Ordenador, B.AreaNome, B.CutPointNome, B.Operador, Feminino, Masculino, " + 
						" CutPointValor AS Inicio,  " + 
						" (   SELECT " + 
								" CASE WHEN A.Operador = '>=' THEN A.CutPointValor - 0.01 ELSE A.CutPointValor END AS Op  " + 
							" FROM " + 
								" Area_Cutpoint A " + 
							" WHERE B.Ordenador = A.Ordenador - 1) Fim " +  
					" FROM " + 
						" Area_Cutpoint B " + 
				" ) GERAL2 " + 
				" WHERE CutPointNome = '" + cutPointNome + 
				"' AND AreaNome = '" + areaNome + 
				"' AND GERAL2.INICIO <= " + valor + " AND GERAL2.FIM >= " + valor + ";";
	
	console.log('******** query *********');
	console.log(query);
	console.log('');
			
    connection.query(query, function(err, rows, fields) {
                     
        if (err) {
            console.log('Erro na query: ' + err);
            connection.end();
        } else {/*
            console.log('**********rows:');
            console.log(rows);
            console.log('');
			
            console.log('**********rows[0].CutPointNome:');
            console.log(rows[0].CutPointNome);
            console.log('');
			
            console.log('**********obtendo genero:');
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]);
            };
            console.log('');*/
			
			var resultado = rows[0];
			
            res.json({ resultado });
        }
    });

});


app.get('/api/obterTudo', function(req, res) {

    connection.query("SELECT * FROM Area_Cutpoint", function(err, rows, fields) {
                     
        if (err) {
            console.log('Erro na query:' + err);
            connection.end();
        } else {
            /*for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]);
            };*/			
			
			var resultado = rows[0];
			
			console.log('rows.length');
			console.log(rows.length);
			console.log('');
            
			console.log('*** tudo');
            console.log(rows);
            console.log('');
			
            res.json({ resultado: rows });
        }
    });
});

app.get('/admin', function(req, res) {
    res.sendfile('./public/admin.html');
});

app.listen(app.get('port'), function() {
    console.log('CranioWebApi is running on port', app.get('port'));
});
