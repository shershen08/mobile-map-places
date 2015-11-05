angular.module('mapApp')

.controller('aboutCtrl', ['$scope', '$rootScope', 'APP_SETTINGS',
function($scope, $rootScope, APP_SETTINGS){
  //code here
}])




.controller('addCtrl', ['$scope', '$rootScope', 'APP_SETTINGS',
function($scope, $rootScope, APP_SETTINGS){


  var vm = this;


  vm.saveAddress = function(){

      //vm.address
      //vm.geo
      //vm.description

      // should POST to /addpoint

  };

  vm.getAddress = function(){

  };


}])

.controller('homeCtrl', ['$scope', '$state', '$stateParams', '$http', 'APP_SETTINGS',
      function ($scope, $state, $stateParams, $http, APP_SETTINGS) {

    $http.get('map-v0.2-.geojson').then(function(response){

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
                    icon : 'assets/blue-point.png',
                    options : {
                      labelContent: 'You',
                      labelAnchor: "100 0",
                      labelClass: "marker-labels"
                    },
                    showWindow  : false,
                    id          : $scope.points.length
                  };
        $scope.points.push(ret);
        $scope.$apply();
    }

    $scope.map = { center: { latitude: APP_SETTINGS.centerPoint[0], longitude: APP_SETTINGS.centerPoint[1] }, zoom: APP_SETTINGS.defaultZoom };

    $scope.title = 'Amsterdam toilets map';
    $scope.version = APP_SETTINGS.version;

    $scope.markerClick  = function(item){
      console.info(item);
    }
}])
