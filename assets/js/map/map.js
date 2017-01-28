



function launchMap() {
	var conf = {
	  container : $_id("providersMap")
	};

	VMLaunch("ViaMichelin.Api.Map", conf);
}


function displayClusters(data) {
		console.log('display data : ', data);

}

