document.addEventListener('DOMContentLoaded', function(){
  // 詳細ページのフォームを取得
  const mapPlace = document.getElementById('map');
  // 詳細ページのフォームがないならここで終了
  if (!mapPlace) return null;
  var script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&callback=initMap`;
  script.async = true;

  document.head.appendChild(script);

  window.initMap = function() {
    var map;
    var marker = [];
    var latLng;
    var spotData = gon.lat_lng;
    var infoWindow = [];
    var currentInfoWindow = null;
    var count = 0;
 
    map = new google.maps.Map(document.getElementById('map'));
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < spotData.length; i++){
      if (spotData[i]['lat'] !== null && spotData[i]['lng'] !== null){
        latLng = new google.maps.LatLng({lat: spotData[i]['lat'], lng: spotData[i]['lng']});
        bounds.extend(latLng);
        marker[i] = new google.maps.Marker({
          position:  latLng,
          map: map
        });
        infoWindow[i] = new google.maps.InfoWindow({
          content: '<div class="info_window">' + "写真の場所" + '</div>'
        }); 
        if(i == 0 && marker[i]){
          infoWindow[i].open(map, marker[i]);
          currentInfoWindow = infoWindow[i];
        };
        changeEvent(i);
        markerEvent(i);
        count += 1;
      };
    };

    if (count == 0){
      var marker = [];
      var latLng = [];
      var myLatLng; 
      spotData = gon.spots;
      var geocoder = new google.maps.Geocoder();

      geocode(after_geocode);
      function geocode(callback){
        var cRef = spotData.length;
        for (var i = 0; i < spotData.length; i++) {
            (function (i) { 
                geocoder.geocode({'address': spotData[i]}, 
                    function(results, status) { // 結果
                        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                            latLng[i]=results[0].geometry.location;// マーカーを立てる位置をセット
                            marker[i] = new google.maps.Marker({
                                position: results[0].geometry.location, // マーカーを立てる位置を指定
                                map: map // マーカーを立てる地図を指定
                            });
                        } else { // 失敗した場合
                        }
                        if (--cRef <= 0) {
                            callback();//全て取得できたらafter_geocode実行
                        }
                    }//function(results, status)の終了
                );//geocoder.geocodeの終了
            }) (i);
        };//for文の終了
      };//function geocode終了
    };
    map.fitBounds(bounds);

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
  
    function markerEvent(i) {
      marker[i].addListener('click', function() {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        };
        infoWindow[i].open(map, marker[i]);
        $('.slider').slick('slickGoTo', i, false);
        currentInfoWindow = infoWindow[i];
      });
    };

    function after_geocode(){
      myLatLng = latLng[0];
      var opt = {
          center: myLatLng,
          zoom: 10
      };
      map.setOptions(opt);
    };
  };
});