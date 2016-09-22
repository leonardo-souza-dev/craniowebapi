// public/core.js
var craniowebapifront = angular.module('craniowebapifront', []);
var hash = 'craniowebapifront';

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/obterSuperiores')
        .success(function(data) {
            $scope.superiores = data.resultado;
            console.log('data.resultado');
            console.log(data.resultado);
        })
        .error(function(data) {
            console.log('Error: ');
            console.log(data);
        });
}