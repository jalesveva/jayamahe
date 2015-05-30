var convert = require('../lib/convert');
var fs = require('fs');
convert({ path : __dirname + '/../data/dummy/data-2015-05-22.xml'}, function(err, json){
  if (err)
    throw err;
  fs.writeFileSync(__dirname + '/../data/dummy/data-2015-05-22-min.json', JSON.stringify(json.features));
  fs.writeFileSync(__dirname + '/../data/dummy/data-2015-05-22.geojson', JSON.stringify(json, null, 2));
  fs.writeFileSync(__dirname + '/../data/dummy/data-2015-05-22-min.geojson', JSON.stringify(json));
});
