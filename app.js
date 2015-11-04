
var express = require('express');
var path = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.static('app'));, __dirname + '/app');

app.use('/', express.static(__dirname + '/app'));

// app.get('/', function(request, response) {
//
//   var filePath = path.join(__dirname, 'app/index.html');
//   response.sendFile(static filePath);
//
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
