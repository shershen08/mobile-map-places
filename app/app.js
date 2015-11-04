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
  'defaultZoom' :  13,
  'version'     : '0.2'
})

mapApp.value('version', '0.2');

mapApp.controller('homeCtrl', ['$scope', '$state', '$stateParams', '$http', 'APP_SETTINGS',
      function ($scope, $state, $stateParams, $http, APP_SETTINGS) {

    $http.get('app/map-v0.2-.geojson').then(function(response){

      var pointsArray = [];
      response.data.features.forEach(function(element, index){

          var ret = {
                      latitude    : element.geometry.coordinates[1],
                      longitude   : element.geometry.coordinates[0],
                      title       : 'Point ' + index,
                      id          : index
                    };

            pointsArray.push(ret);
      })
      $scope.points = pointsArray;
    })

    function requestGeoPosition(){
      if (navigator.geolocation) {
         return navigator.geolocation.getCurrentPosition(showPosition);
      } else {
         showPosition("Geolocation is not supported by this browser");
      }
    }

    $scope.locateUser = function(){
      requestGeoPosition();
    }

    function showPosition(details){
      if(angular.isObject(details)){
          addItemToMap(details.coords);
      }
    }

    function addItemToMap(coordinates){
        var ret = {
                    latitude    : coordinates.latitude,
                    longitude   : coordinates.longitude,
                    title       : 'You',
                    id          : $scope.points.length
                  };
        $scope.points.push(ret);
        $scope.$apply();
    }

    $scope.map = { center: { latitude: APP_SETTINGS.centerPoint[0], longitude: APP_SETTINGS.centerPoint[1] }, zoom: APP_SETTINGS.defaultZoom };

    $scope.title = $state.current.name;
    $scope.version = APP_SETTINGS.version;

    $scope.markerClick  = function(item){
      console.info(item);
    }
}])
