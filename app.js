var map = L.map('map').setView([-1.269160, 116.825264], 3);
L.mapbox.accessToken = 'pk.eyJ1IjoiZGlvcmFobWFuIiwiYSI6IkNQLXNqX2MifQ.2U5fcgqoKq5qxwkbdyjRYQ';
var tiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  id: 'diorahman.m9o84opn',
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

var markerOptions = {
  radius: 6,
  fillColor: '#ff33cc',
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

var request = new XMLHttpRequest();
request.open('GET', 'http://dev.aegis.co.id:9001/points', true);
request.onload = function() {
  var markers = L.markerClusterGroup();
  var geoJson = L.geoJson(JSON.parse(this.responseText), {
    onEachFeature : function(feature, layer) {
      layer.bindPopup(feature.properties.NAMA_KAPAL_VMS);
    }
  });
  markers.addLayer(geoJson);
  map.addLayer(markers);
  map.fitBounds(markers.getBounds());
}

tiles.on('load', function(event){
  request.send();
});

