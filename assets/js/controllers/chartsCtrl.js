angular.module('justintime').controller('chartsCtrl', ['$scope', 'mainFactory',
    function($scope, mainFactory){

        $scope.showSupplierForm = false;
        mainFactory.algoCharts.init();
        //On click on the charts button
        $scope.charts = function (type)
        {
            mainFactory.algoCharts.request(type);
        }

        $scope.detailFour = function ()
        {
            $scope.showSupplierForm = true;
        }

        $scope.querySupplier = function()
        {
            mainFactory.algoCharts.setQuery($scope.supplier);
            mainFactory.algoCharts.request(1);
        }
    }
]);
