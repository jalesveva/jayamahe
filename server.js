var express = require('express');
var read = require('./read');
var cors = require('cors');
var server = express();

server.use(express.static('./public'));
server.get('/points', [cors(), function(req, res){
  res.send(points);
}]);

read('./data/data-2015-05-22.xml', function(err, data){
  points = data;
  points.features.forEach(function(feature){
    for (var k in feature.properties) {
      if (Array.isArray(feature.properties[k]))
        feature.properties[k] = feature.properties[k][0];
    }
  });
  server.listen(process.env.PORT || 8000);
});
