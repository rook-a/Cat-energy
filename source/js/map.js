let map, icon;

function initMap() {
  map = new google.maps.Map(document.querySelector('.contact__map'),{
    center : { lat: 59.938635, lng: 30.323118 }
  });

  setMapCenter();

  if (window.innerWidth < 768) {
    icon = {
      url: '../img/icon/pin-mobile.png'
    };
  } else {
    icon = {
      url: '../img/icon/pin.png'
    };
  };
  let marker = new google.maps.Marker({
    position: { lat: 59.9381, lng: 30.323 },
    map: map,
    title: 'Cat Energy',
    icon: icon
  });
}
window.addEventListener('resize', setMapCenter);

function setMapCenter() {
  if (window.innerWidth < 768) {
    map.setZoom(14);
  } else if (window.innerWidth > 1280) {
    map.setCenter({ lat: 59.938, lng: 30.319 })
    map.setZoom(16);
  } else {
    map.setZoom(15);
  };
}
