

var myMap = null;
var marker;
var markers = [];

function launchMap() {
	var conf = {
	  container : $_id("providersMap"),
	  mapTypeControlOptions : {type: ViaMichelin.Api.Constants.Map.TYPE.LIGHT}
	};


	var callbacks = {
		onInit: function(serviceMap){
			myMap = serviceMap;
		},
		onClick: function(event){
	
		},
		//If center is a locID or a (dbID, poiID) pair, you must uncomment this section
		//to set the zoom level defined in the zoom parameter
		onSuccess: function(){
			this.refresh();						
			
		},
		onInitError: function(){
			alert('Whoops Map cannot be loaded!');
		}
	}


	VMLaunch("ViaMichelin.Api.Map", conf, callbacks);
}


var position0 =280;
var position1 =200;
var position2 =0;

function startMapTracking(data){
	console.log("start Tracking ...");
	console.log(data[0].itiTrace[0][1000])

	//init markers
	markers = []; 
	myMap.removeAllLayers();

	addMarkers({lon: data[0].itiTrace[0][position0], lat: data[0].itiTrace[1][position0] }, './assets/img/truck.png', "shadown", false, " HI   ",  " HI  REF "+data[0].id, "true");
	addMarkers({lon: data[0].itiTrace[0][position1], lat: data[0].itiTrace[1][position1] }, './assets/img/truck.png', "shadown", false, " HI   ",  " HI  REF "+data[1].id, "true");
	addMarkers({lon: data[0].itiTrace[0][position2], lat: data[0].itiTrace[1][position2] }, './assets/img/truck.png', "shadown", false, " HI  ", " HI  REF "+data[2].id, "true");
	myMap.drawMapFromLayers();

	
	var moveTimer = setInterval(function moveTonNextCordinates(){
		console.log("GPS Coords P1: "+position0+"  - P2: "+position1+ " - P3: "+position2);

		markers[0].setPosition({lon: data[0].itiTrace[0][position0], lat: data[0].itiTrace[1][position0] });
		markers[1].setPosition({lon: data[0].itiTrace[0][position1], lat: data[0].itiTrace[1][position1] });
		markers[2].setPosition({lon: data[0].itiTrace[0][position1], lat: data[0].itiTrace[1][position2] });

		position0++;
		position1++;
		position2++;

	}, 1000);



}




function addMarkers(coords, icon, shadown, autoOpen, mytitle, infoBubleContent, visibility){
		//create a marker to display ViaMichelin headquarters
		   var marker = new ViaMichelin.Api.Map.Marker({
			coords :  coords,
			htm : infoBubleContent,
			//image is 52*36 so offset is half those dimensions
			icon : {url: icon , offset: {x : -25, y: -25}},
			autoOpen: "true", 
			title: mytitle
			});
		myMap.addLayer(marker);
		markers.push(marker)
	}


