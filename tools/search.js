var es = require('elasticsearch');
var fs = require('fs');
var client = new es.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.search({
  index: 'vms',
  q: 'properties.pemilikKapal:sukardi'
}, function(err, response){
  console.log(JSON.stringify(response.hits, null, 2));
  console.log(response.hits.total);
});

