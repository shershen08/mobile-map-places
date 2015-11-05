
var express = require('express');
var path = require('express');
var app = express();
var fs = require('fs');
var qs = require('querystring');


var dbFile = 'output.txt';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.static('app'));, __dirname + '/app');

app.use('/', express.static(__dirname + '/app'));

app.post('/addpoint', function(req, res){

    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {

        var POST = qs.parse(body);
        var json = ' > ' +  POST.address + ' | ' +  POST.description + ' | ' +  POST.geo + ' | ' + (new Date).getTime() + '\n';

        fs.appendFile(dbFile, json , function(err){
            console.log('Successfully written ', (new Date()).getTime());
        })

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end();
    });
});



// app.get('/', function(request, response) {
//
//   var filePath = path.join(__dirname, 'app/index.html');
//   response.sendFile(static filePath);
//
// });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
