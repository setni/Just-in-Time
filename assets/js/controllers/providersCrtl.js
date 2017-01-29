angular.module('justintime').controller('providersCtrl', ['$scope','$http', 'mainFactory',
    function($scope,$http, mainFactory){

    	$scope.message = "test"
        $scope.showDetail = [];

        mainFactory.map.launchMap();
    	//launchMap();

    		var data ;
    		$.getJSON("./assets/conf/itiTraces.json", function(json) {
			    data = json;
			});


    	$http.get("https://psa.opendatasoft.com/api/records/1.0/search/?dataset=carto_fournisseurs_site&rows=10&apikey=6d9b68a8b2bcc12967438ce7c922eeda33676c778766adfac9468f16")
		    .then(function(response) {
		    	var poiList = response.data.records;

		        $scope.providersList = poiList;

		        //console.log(response.data);
		 });

		 $scope.doClick = function(item, event){
		 	//console.log(" - Clicked Element: ",item.fields.cofor_fnr_liv);
		 	console.log( "Data: ", data)

		 	$scope.selectedItem = item;
		 	$scope.currentDeliveryList = data;
            var j = 0;
            for(var i in $scope.currentDeliveryList) {
                $scope.currentDeliveryList[i].index = j++;
                $scope.showDetail.push(false);
            }
		 	$( "#providersList" ).hide( "slow", function() {

    			//1. display clicked provider
    			//2. Display current delevry List
    			mainFactory.map.startMapTracking(data);


  			});

        };

        $scope.detailDisplay = function(index)
        {
            $scope.showDetail[index] = true;
        };
        $scope.detailClose = function(index)
        {
            $scope.showDetail[index] = false;
        }

    }
]);
