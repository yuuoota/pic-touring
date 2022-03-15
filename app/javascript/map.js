document.addEventListener('DOMContentLoaded', function(){
  // 詳細ページのフォームを取得
  const mapPlace = document.getElementById('map');
  // 詳細ページのフォームがないならここで終了
  if (!mapPlace) return null;
  console.log("map.jsが読み込まれました");
  console.log(gon.spot);
  // Create the script tag, set the appropriate attributes
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA6FSwMZ7Kx1B8kzvOCxyMd_rTt3rzR2HI&callback=initMap';
  script.async = true;
  // Append the 'script' element to 'head'
  document.head.appendChild(script);

  // Attach your callback function to the `window` object
  window.initMap = function() {
    var map;
    var marker = [];
    var spotData = gon.spot;
    var infoWindow = [];
    for (var i = 0; i < spotData.length; i++){
      if (spotData[i]['lat'] !== null && spotData[i]['lng'] !== null){
        geocoder = new google.maps.Geocoder()
        var lat = spotData[i]['lat'];
        var lng = spotData[i]['lng'];

        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 12,
        });
        break;
      };
    };

    for (var i = 0; i < spotData.length; i++){
      if (spotData[i]['lat'] !== null && spotData[i]['lng'] !== null){
        markerLatLng = new google.maps.LatLng({lat: spotData[i]['lat'], lng: spotData[i]['lng']});
        marker[i] = new google.maps.Marker({
          position:  markerLatLng,
          map: map
        });
        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
          content: '<div class="info_window">' + "&#931" + [i + 2] + '</div>'
        });
        markerEvent(i); // マーカーにクリックイベントを追加
      };
    };
    // マーカーにクリックイベントを追加
    function markerEvent(i) {
      marker[i].addListener('click', function() { // マーカーをクリックしたとき
      infoWindow[i].open(map, marker[i]); // 吹き出しの表示
      });
    };
  };
});