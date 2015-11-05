var mapApp = angular.module('mapApp', ["mobile-angular-ui", "uiGmapgoogle-maps", "ui.router"]);

mapApp.config(function($stateProvider, $urlRouterProvider) {

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
          controller : 'addCtrl',
          controllerAs : 'vm'
        })
            .state("about", {
          url: "/about",
          controller : 'aboutCtrl'
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

mapApp.value('version', '0.2');
