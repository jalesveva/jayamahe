var Signs = {
  LU : 1,
  BT: 1,
  LS: -1,
  BB: -1
};

var csv = require('fast-csv');
var fs = require('fs');

var DIR = __dirname + '/../data/csv';
var files = fs.readdirSync(DIR);

files.forEach(function(file){
  read(DIR + '/' + file);
});

function read(file) {

var stream = fs.createReadStream(file);
var csvStream = csv.parse({
  objectMode: true,
  headers: true
});

var points = [];

function calculate(d, m, s, sign) {
  return (parseFloat(d) + m/60 + s/3600) * sign;
}

csvStream.on('data', function(data) {
  var lat = calculate(data.dl, data.ml, data.sl, Signs[data.l]); 
  var lng = calculate(data.db, data.mb, data.sb, Signs[data.b]); 
  points.push([lng, lat]);
});

csvStream.on('end', function(){
  var origin = points[0];
  points.push(origin);
  var polygon = {
    type: 'Polygon',
    coordinates: [points]
  }
var OUT = __dirname + '/../data/json';
var arr = file.split('/');
file = arr.pop();
arr = file.split('.csv')
arr.pop();
console.log(OUT + '/' + arr.join('') + '.json');
fs.writeFileSync(OUT + '/' + arr.join('') + '.json', JSON.stringify(polygon, null, 2));

});

stream.pipe(csvStream);
}
