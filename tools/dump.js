var es = require('elasticsearch');
var fs = require('fs');
var client = new es.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// insert date time
// insert index at a particular day, e.g 2015-04-04-001 <-- the first (001) insert at 2015-04-04, 002 should be the second

// load data from dummy
var insertDateTime = new Date().valueOf();
var insertDate = // get the date 2015-04-04

// get last index, I guess we need to create another index

var arr = require(__dirname + '/../data/dummy/data-2015-05-22-min.json');
arr.forEach(function(point) {
  var properties = point.properties;
  point.insertDate :
  var doc = {
    index : 'vms',
    type: 'position',
    id: properties.noTransmitter + '-' + properties.reportdate,
    body: point
  }
  client.create(doc, function(err, res){
    console.log(err || res);
  });
});
