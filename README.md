## Installation
- pull the repository files
- ```npm install```

## Dependances
- AngularJS, Angular GoogleMaps
- Angular mobileUI ( http://mobileangularui.com/)
- http://geojson.io (points: https://gist.github.com/anonymous/118c17c2c2395d7c1c0a)

### Notices
On modal window buttons page reload is triggered  ```onclick="(document.location = document.location.origin + '/')"``` istead of ```ui-turn-off="add" ui-sref="home" ``` due to Angular.js bug iOS8 - https://github.com/angular/angular.js/issues/9128