var map = L.map('map').setView([-1.269160, 116.825264], 5);
L.mapbox.accessToken = 'pk.eyJ1IjoiZGlvcmFobWFuIiwiYSI6IkNQLXNqX2MifQ.2U5fcgqoKq5qxwkbdyjRYQ';
L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  id: 'diorahman.m9o84opn',
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

var request = new XMLHttpRequest();
request.open('GET', '/data/data-2015-05-22.json', true);
request.onload = function() {
  L.geoJson(JSON.parse(this.responseText), {
    onEachFeature : function(feature, layer) {
      layer.bindPopup(feature.properties.NAMA_KAPAL_VMS);
    }
  }).addTo(map);
}
request.send();

