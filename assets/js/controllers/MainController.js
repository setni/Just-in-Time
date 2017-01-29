angular.module('justintime').controller('mainCtrl', ['$scope', 'mainFactory', '$http',
    function($scope, mainFactory, $http){
        $http.get("https://psa.opendatasoft.com/api/records/1.0/search/?dataset=carto_fournisseurs_site&rows=10&apikey=6d9b68a8b2bcc12967438ce7c922eeda33676c778766adfac9468f16")
		    .then(function(response) {
		    	$scope.providersList = response.data.records;

		        //console.log(response.data);
		 });
    }
]);
