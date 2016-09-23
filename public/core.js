// public/core.js
var hash = 'craniowebapifront';
var estiloEditPadrao = {
			'background-color': '#EFEFEE',
			'border': '0px solid #FFF',
			'padding': '6px 12px'
		};

var cradmin = angular.module("cradmin", []).controller('mainController', function ($scope, $http) {

    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/obterTudo')
        .success(function(data) {
            $scope.registros = data.resultado;
            console.log('data.resultado');
            console.log(data.resultado);
        })
        .error(function(data) {
            console.log('Error: ');
            console.log(data);
        });
		
    $scope.gravarOuAtualizarParametro = function (pParametro) {
            console.log('*********ENTROU NO GRAVAR OU ATUALIZAR: ');
            //console.log(data);
        $http.post("/api/gravarouatualizarparametro", pParametro)
            .success(function (data) {
                $scope.artigo = {};
            }).error(function(data) {
                console.log(data);
            });
    };
	
    $scope.editarParametro = function(pParam) {
		console.log('editando o parametro de chave ' + pParam.chave);
		console.log(pParam);
		if (!$scope.editavel) {
            $scope.estiloPadrao = {
			    'background-color': '#FFFFFF',
			    'border': '1px solid #ccc',
				'font-size': '14px',
				'border-radius': '4px',
				'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
				'transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                'padding': '6px 12px'
			};
		    $scope.editavel = !$scope.editavel;
		}
    };
	
	$scope.estiloPadrao = estiloEditPadrao;
	
    $scope.parouEditarParametro = function(pParam) {
        $scope.estiloPadrao = estiloEditPadrao;
		$scope.editavel = !$scope.editavel;
		
		$scope.gravarOuAtualizarParametro(pParam);
    }
});