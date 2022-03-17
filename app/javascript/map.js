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
    var currentInfoWindow = null;
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
          content: '<div class="info_window">' + "画像のスポット" + '</div>'
        });
        if(i == 0 && marker[i]){
          infoWindow[i].open(map, marker[i]);
          currentInfoWindow = infoWindow[i];
        }
        changeEvent(i);
        markerEvent(i); // マーカーにクリックイベントを追加
      };
    };

    function changeEvent(i) {
      $('.slider').on('afterChange', function() {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        };
        var currentSlide = $('.slider').slick('slickCurrentSlide');
        if(typeof marker[currentSlide] != 'undefined'){
          infoWindow[currentSlide].open(map, marker[currentSlide]);
          currentInfoWindow = infoWindow[currentSlide];
        };
      });
    };  

    // マーカーにクリックイベントを追加
    function markerEvent(i) {
      marker[i].addListener('click', function() { // マーカーをクリックしたとき
        if (currentInfoWindow) {
          currentInfoWindow.close();
        };
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
        $('.slider').slick('slickGoTo', i, false);
        currentInfoWindow = infoWindow[i];
      });
    };
  };
});