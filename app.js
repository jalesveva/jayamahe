var host = 'jalesveva.github.io'
if (window.location.host == host && window.location.protocol != 'https:') {
  window.location.protocol = 'https:'
}

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

function get() {
  var request = new XMLHttpRequest();
  request.open('GET', 'data/dummy/data-2015-05-22-min.geojson', true);
  request.onload = function() {
    var markers = L.markerClusterGroup();
    var geoJson = L.geoJson(JSON.parse(this.responseText), {
      onEachFeature : function(feature, layer) {
        layer.bindPopup(feature.properties.namaKapalVms);
      }
    });
    markers.addLayer(geoJson);
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());
  }
  request.send();
}

tiles.on('load', function(event) {
  get();
});

