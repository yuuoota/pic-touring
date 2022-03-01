// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA6FSwMZ7Kx1B8kzvOCxyMd_rTt3rzR2HI&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  geocoder = new google.maps.Geocoder()

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7828, lng:-73.9653},
    zoom: 12,
  });

  marker = new google.maps.Marker({
    position:  {lat: 40.7828, lng:-73.9653},
    map: map
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

let map;
const display = document.getElementById('display');

let geocoder;

function codeAddress(){
  let inputAddress = document.getElementById('address').value;

  geocoder.geocode( { 'address': inputAddress}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('該当する結果がありませんでした：' + status);
    }
  });   
};