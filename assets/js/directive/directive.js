angular.module('justintime').directive("track", function(){
    return {
          restrict: 'E',
          scope: {
            controller: '=controller'
          },
          createScope : false,
          templateUrl: 'views/template/track.html',
          link: function(scope, element, attrs){

          }
    };
});
