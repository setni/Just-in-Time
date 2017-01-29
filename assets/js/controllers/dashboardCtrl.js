angular.module('justintime').controller('dashboardCtrl', ['$scope', 'mainFactory',
    function($scope, mainFactory){
        setTimeout(function () {
            $scope.providersList = $scope.$parent.providersList;
            console.log($scope.$parent.providersList);
        }, 1000);
    }
]);
