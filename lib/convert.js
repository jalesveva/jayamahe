var fs = require('fs');
var xml2js = require('xml2js');
var changeCase = require('change-case');
var parse = xml2js.parseString;

function pop(arr) {
  return Array.isArray(arr) ? arr.pop() : arr;
}

function toPointFeature(record, longKey, latKey) {
  var point = {
    type: 'Feature',
    geometry: {},
    properties: {}
  }
  var coord = [-1,-1];
  for (var key in record) {
    if (key == longKey)
      coord[0] = parseFloat(pop(record[key])); 
    else if (key == latKey)
      coord[1] = parseFloat(pop(record[latKey]));
    else if (key.toLowerCase().indexOf('date') >= 0)
      point.properties[changeCase.camelCase(key)] = new Date(pop(record[key]));  
    else
      point.properties[changeCase.camelCase(key)] = pop(record[key]); 
  }
  point.geometry = {
    type: 'Point',
    coordinates: coord
  }
  if (coord[0] == -1 && coord[1] == -1)
    return;
  return point;
}

module.exports = function(options, cb) {
  if (typeof options.path != 'string')
    throw new TypeError('Path is required');
  fs.readFile(options.path, function(err, data){
    if (err)
      return cb(err);
    parse(data, function(err, json){
      if (err)
        return cb(err);
      var points = [];
      json.main.DATA_RECORD.forEach(function(record) {
        points.push(toPointFeature(record, 'LAST_LONGITUDE', 'LAST_LATITUDE'));
      });
      var featureCollection = {
        type: 'FeatureCollection',
        features: points
      }
      cb(null, featureCollection)
    });
  });
}

