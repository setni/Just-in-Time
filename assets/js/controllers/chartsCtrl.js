angular.module('justintime').controller('chartsCtrl', ['$scope',
    function($scope){

        var generateCharts = {

            // Iniialisation of the library
            init: function () {
                GeneriqueSDK = new GeneriqueSDK();
                GeneriqueSDK.setApikey("7b2b51dcc8bc960844df6cd087909cc16469e118643886d6ee1c6730");
                GeneriqueSDK.setUrl("https://psa.opendatasoft.com/api/records/1.0/search/");
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
                var data = {
                    dataset: dataset,
                    lang: "fr",
                    q: "",
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
                        console.log(generateCharts.extraValue(r));
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
                var count = generateCharts.arrayCount(array);
                generateCharts.creategraph({
                    key: count[0],
                    value: count[1]
                });

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
            creategraph: function (dataset) {
                var data = [
                  {
                    x: dataset.key,
                    y: dataset.value,
                    type: 'bar'

                  }
                ];
                var layout = {                     // all "layout" attributes: #layout
                    title: 'retard de livraison',  // more about "layout.title": #layout-title
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

        //On click on the charts button
        $scope.charts = function (type) {
            generateCharts.init();
            generateCharts.request(type);
        }
    }
]);
