var convert = require('../lib/convert');

PREFIX = 'data-2015-06-03';

var fs = require('fs');
convert({ path : __dirname + '/../data/dummy/' + PREFIX + '.xml'}, function(err, json){
  if (err)
    throw err;
  fs.writeFileSync(__dirname + '/../data/dummy/' + PREFIX + '-min.json', JSON.stringify(json.features));
  fs.writeFileSync(__dirname + '/../data/dummy/' + PREFIX + '.geojson', JSON.stringify(json, null, 2));
  fs.writeFileSync(__dirname + '/../data/dummy/' + PREFIX + '-min.geojson', JSON.stringify(json));
});
