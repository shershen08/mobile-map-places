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
});


mapApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

mapApp.controller('homeCtrl', ['$scope', '$state', '$stateParams',
      function ($scope, $state, $stateParams) {


    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.title = $state.current.name;
}])