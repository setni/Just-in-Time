angular.module('justintime').controller('providersCtrl', ['$scope','$http',
    function($scope,$http){

    	$scope.message = "test"

    	launchMap();

    	$http.get("https://psa.opendatasoft.com/api/records/1.0/search/?dataset=carto_fournisseurs_site&rows=10&apikey=6d9b68a8b2bcc12967438ce7c922eeda33676c778766adfac9468f16")
		    .then(function(response) {
		    	var poiList = response.data.records; 
		        $scope.providersList = poiList;

		        console.log(response.data);     
		    });

    }
]);
