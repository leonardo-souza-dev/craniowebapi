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

function inserir(errInsert, rowsInsert) {
	if (errInsert) {
		corpoResponse = { resultado: "ERR: Erro ao inserir" };
		console.log(corpoResponse);
	    console.log('Erro na query:' + errInsert);
	    connection.end();
	} else {

		//console.log('************************ rows3');
		//console.log(rows3);
		//console.log('************************ rows3[0]');
		//console.log(rows3[0]);

		var msgAtualizacao =  "VERBOSE: Inseriro Registro Id #" + rowsInsert.insertId;
		console.log(msgAtualizacao);
		
		console.log('--------------------------------response final de INSERCAO');
		var obj = { resultado: { msg: msgAtualizacao, novoId: rowsInsert.insertId } };
        return obj;
	}
}

function atualizar(errAtualizar, rowsAtualizar, fields2) {
    if (errAtualizar) {
    	corpoResponse = { resultado: "ERR: Erro ao atualizar" };
    	console.log(corpoResponse);
        console.log('Erro na query:' + errAtualizar);
        connection.end();
    } else {
    	var msgAtualizacao =  "VERBOSE: Atualizado Registro Id #" + lId;
    	console.log(msgAtualizacao);
		
		console.log('--------------------------------response final de ATUALIZACAO');
		res.json({ resultado: { resultado: msgAtualizacao } });
    }
}

function gravarOuAtualizar(err1, rows1, fields, objetoInsercao) {
    if (err1) {
        console.log('Erro na query:' + err1);
        connection.end();
    } else {			
		var resultado = rows1[0];
        
		console.log('*** resultado do select');
        console.log(rows1);
        console.log('');

        if (rows1.length == 0) {
			console.log('*** zero resultado');

			var queryInsert = "INSERT INTO Area_Cutpoint " + 
							 " (AreaNome, CutPointNome, Operador, CutPointValor, Feminino, Masculino , Ordenador) " + 
					  " VALUES ('"+
					  	objetoInsercao.AreaNome + "','" +
					  	objetoInsercao.CutPointNome + "', '" +
					  	objetoInsercao.Operador + "', '" +
					  	objetoInsercao.CutPointValor + "', '" +
					  	objetoInsercao.Feminino + "', '" +
					  	objetoInsercao.Masculino + "', '" +
					  	objetoInsercao.Ordenador + "');";

			console.log(queryInsert);

			//INSERIR
		    connection.query(queryInsert, inserir);

        } else {
			console.log('*** ' + rows1.length +  ' resultados');

			var queryUpdate = "UPDATE Area_Cutpoint " + 
							 " SET AreaNome = '" + lAreaNome + 
							 "', CutPointNome = '" + lCutPointNome + 
							 "', Operador = '" + lOperador + 
							 "', CutPointValor = '" + lCutPointValor + 
							 "', Feminino = '" + lFeminino + 
							 "', Masculino = '" + lMasculino + 
							 "', Ordenador = '" + lOrdenador + 
							 "' WHERE Id = " + lId + ";";

			//ATUALIZAR
		    connection.query(queryUpdate, atualizar);

        }
    }
}

//implementacao parcial
app.post('/api/gravarouatualizarparametro', function procurarExistente(req, res) {

    //console.log('********');
    //console.log('req.body');
    //console.log(req.body);
    //console.log('');

    //console.log('********');
    //console.log('req.body.Id');
    //console.log(req.body.Id);
    //console.log('');

    var lId = req.body.Id;
    var lAreaNome = req.body.AreaNome;
    var lCutPointNome = req.body.CutPointNome;
    var lOperador = req.body.Operador;
    var lCutPointValor = req.body.CutPointValor;
    var lFeminino = req.body.Feminino;
    var lMasculino = req.body.Masculino;
    var lOrdenador = req.body.Ordenador;

    var objeto = { 
    	AreaNome: lAreaNome, 
    	CutPointNome: lCutPointNome, 
    	Operador: lOperador, 
    	CutPointValor: lCutPointValor,
    	Feminino: lFeminino,
    	Masculino: lMasculino,
    	Ordenador: lOrdenador
    }

    connection.query(" SELECT * FROM Area_Cutpoint WHERE Id = " + lId + "; ", function (err, rows, fields) {
    	var ojbeto = gravarOuAtualizar(err, rows, fields, objeto, res);
    	
    	console.log('ojbeto');
    	console.log(ojbeto);
    	
    	return res.json( ojbeto );
    });		
});

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
