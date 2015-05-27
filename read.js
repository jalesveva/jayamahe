var parseString = require('xml2js').parseString;
var geojson = require('geojson');
var fs = require('fs');

module.exports = function(path, cb) {
  fs.readFile(path, function(err, data){
    if (err)
      return cb(err);
    parseString(data, function(err, points){
      if (err)
        return cb(err);
      var collections = geojson.parse(points.main.DATA_RECORD, { Point: ['LAST_LATITUDE', 'LAST_LONGITUDE']});
      cb(null, collections);
    });
  });
}
