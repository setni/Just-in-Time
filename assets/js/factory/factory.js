angular.module('justintime').factory('mainFactory',
    function($http, $location, $sce){
        var algoCharts = {

            query: "",
            graphType: "bar",
            // Iniialisation of the library
            init: function () {
                GeneriqueSDK = new GeneriqueSDK();
                GeneriqueSDK.setApikey(APIKEY);
                GeneriqueSDK.setUrl("https://psa.opendatasoft.com/api/records/1.0/search/");
            },

            /**
            * @function {public} void set query
            * @param {string} query
            */
            setQuery: function (query) {
                algoCharts.query = query;
            },

            /**
            * @function {public} void Send a JSONP request
            * @param {int} type of graph
            */
            request: function (type) {
                //Type of graph
                switch (type) {
                    case 1:
                        dataset = "chrono_taux_de_services_fournisseurs";
                        break;
                    default:
                        dataset = "chrono_taux_de_services_fournisseurs";
                        break;
                }
                //Loader
                document.getElementById("pacman").style.display = "block";
                //params of the request
                console.log(algoCharts.query);
                var data = {
                    dataset: dataset,
                    lang: "fr",
                    q: algoCharts.query,
                    rows: 1000,
                    start: 0
                };

                //Request perform by The Generique SDK library
                GeneriqueSDK.get(data, function (r) {
                    if(r.error) {
                        document.getElementById("pacman").style.display = "none";
                        throw r.error;
                    }
                    if(dataset == "chrono_taux_de_services_fournisseurs") {
                        console.log(algoCharts.extraValue(r));
                    }

                });
            },

            /**
            * @function {public} string analyse datas
            * @param {object} set of data from API
            * @return {string} Wrongs values
            */
            extraValue: function (r) {
                var j = 0;
                var array = [];
                for(var i= 0; i < r.records.length; i++) {
                    var theo = new Date(r.records[i].fields.theoricaldhxx);
                    var real = new Date(r.records[i].fields.realdhxx);

                    if(real.getTime()+(24*3600*1000)< theo.getTime() || real.getTime() > theo.getTime()+(30*3600*24*1000)) {
                        j++;
                    } else if(Math.abs((real.getTime() - theo.getTime())) < 3600*24*1000) {
                        array.push(parseInt((real.getTime()-theo.getTime())/(1000*60*30)));
                    }
                }
                var count = algoCharts.arrayCount(array);
                algoCharts.creategraph({
                    key: count[0],
                    value: count[1]
                }, algoCharts.graphType);

                document.getElementById("pacman").style.display = "none";
                return j+" valeurs aberrantes";
            },

            /**
            * @function {public} array analyse datas
            * @param {object} set of data from API
            * @return {array} keys and values for the graph
            */
            arrayCount: function(arr) {
                var a = [], b = [], prev;

                arr.sort();
                for ( var i = 0; i < arr.length; i++ ) {
                    if ( arr[i] !== prev ) {
                        a.push(arr[i]*30);
                        b.push(1);
                    } else {
                        b[b.length-1]++;
                    }
                    prev = arr[i];
                }

                return [a, b];
            },

            /**
            * @function {public} void analyse datas
            * @param {object} set data for charts
            */
            creategraph: function (dataset, type) {
                var data = [
                  {
                    x: dataset.key,
                    y: dataset.value,
                    type: type

                  }
                ];
                var layout = {                     // all "layout" attributes: #layout
                    title: 'retard de livraison fournisseur '+ algoCharts.query,  // more about "layout.title": #layout-title
                    xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                        title: 'Par minute de retard, tranche de 30 minutes'         // more about "layout.xaxis.title": #layout-xaxis-title
                    },
                    yaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                        title: 'Fréquence'         // more about "layout.xaxis.title": #layout-xaxis-title
                    }
                };

                Plotly.newPlot('myCharts', data, layout);
            }
        };

        var map = {


            myMap: null,
            marker:"",
            markers: [],
            traffic:false,

            launchMap: function() {
            	var conf = {
            	  container : $_id("providersMap"),
            	  mapTypeControlOptions : {type: ViaMichelin.Api.Constants.Map.TYPE.LIGHT}
            	};


            	var callbacks = {
            		onInit: function(serviceMap){
            			map.myMap = serviceMap;
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
            },


            position0: 280,
            position1: 200,
            position2: 0,

            startMapTracking: function(data){
            	console.log("start Tracking ...");
            	console.log(data[0].itiTrace[0][1000]);

            	//init markers
            	markers = [];
            	map.myMap.removeAllLayers();

            	map.addMarkers({lon: data[0].itiTrace[0][map.position0], lat: data[0].itiTrace[1][map.position0] }, './assets/img/truck.png', "shadown", false, " HI   ",  " HI  REF "+data[0].id, "true");
            	map.addMarkers({lon: data[0].itiTrace[0][map.position1], lat: data[0].itiTrace[1][map.position1] }, './assets/img/truck.png', "shadown", false, " HI   ",  " HI  REF "+data[1].id, "true");
            	map.addMarkers({lon: data[0].itiTrace[0][map.position2], lat: data[0].itiTrace[1][map.position2] }, './assets/img/truck.png', "shadown", false, " HI  ", " HI  REF "+data[2].id, "true");
            	map.myMap.drawMapFromLayers();


            	var moveTimer = setInterval(function moveTonNextCordinates(){
            		console.log("GPS Coords P1: "+map.position0+"  - P2: "+map.position1+ " - P3: "+map.position2);

            		markers[0].setPosition({lon: data[0].itiTrace[0][map.position0], lat: data[0].itiTrace[1][map.position0] });
            		markers[1].setPosition({lon: data[0].itiTrace[0][map.position1], lat: data[0].itiTrace[1][map.position1] });
            		markers[2].setPosition({lon: data[0].itiTrace[0][map.position1], lat: data[0].itiTrace[1][map.position2] });

            		map.position0++;
            		map.position1++;
            		map.position2++;

            	}, 1000);



            },




            addMarkers: function(coords, icon, shadown, autoOpen, mytitle, infoBubleContent, visibility){
            		//create a marker to display ViaMichelin headquarters
            		   var marker = new ViaMichelin.Api.Map.Marker({
            			coords :  coords,
            			htm : infoBubleContent,
            			//image is 52*36 so offset is half those dimensions
            			icon : {url: icon , offset: {x : -25, y: -25}},
            			autoOpen: "true",
            			title: mytitle
            			});
            		map.myMap.addLayer(marker);
            		markers.push(marker)
            },

            displayTraffic: function(){
                if (!map.traffic) {
                   map.myMap.setTraffic(true);
                   map.traffic =!map.traffic;
                }else{
                  map.myMap.setTraffic(false);  
                  map.traffic =!map.traffic;
                }
            }

        }

        return {
            algoCharts: algoCharts,
            map: map
        };
    }
);
