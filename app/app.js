var mapApp = angular.module('mapApp', ["mobile-angular-ui", "uiGmapgoogle-maps", "ui.router"]);


mapApp.config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state("home", {
          url: "/home",
          controller : 'homeCtrl'
        })
          .state("list", {
          url: "/list",
          controller : 'homeCtrl'
        })
            .state("add", {
          url: "/add",
          controller : 'homeCtrl'
        }) 
            .state("about", {
          url: "/about",
          controller : 'homeCtrl'
        })
});


mapApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

mapApp.constant('APP_SETTINGS', {
  'centerPoint' :  [52.370216, 4.895168], //Amsterdam
  'defaultZoom' :  13
})

mapApp.controller('homeCtrl', ['$scope', '$state', '$stateParams', '$http', 'APP_SETTINGS',
      function ($scope, $state, $stateParams, $http, APP_SETTINGS) {

    $http.get('app/map.geojson').then(function(data){

      /*

            { "type": "Feature", "geometry": { 
                                            "type": "Point",
                                            "coordinates": [ 4.900556802749634, 52.37315277095617 ] 
                                            },
                                  "properties": { "id": 1, "address": "todo" }
            }

      */
      var pointsArray = [];
      data.data.features.forEach(function(element, index){

          var ret = {
                      latitude    : element.geometry.coordinates[1],
                      longitude   : element.geometry.coordinates[0],
                      title       : element.properties.address,
                      id          : element.properties.id
                    };

            pointsArray.push(ret);
      })


      $scope.points = pointsArray;
    })    

    $scope.map = { center: { latitude: APP_SETTINGS.centerPoint[0], longitude: APP_SETTINGS.centerPoint[1] }, zoom: APP_SETTINGS.defaultZoom };

    $scope.title = $state.current.name;

    $scope.markerClick  = function(item){
      console.info(item);
    }
}])