var app = {
    // Application Constructor
    initialize: function () {
        this._initKendo();
        this._bindEvents();
        this._initPlugins();
    },


    _initKendo: function () {
        this.kendoApp = new kendo.mobile.Application(document.body, {
            layout: 'default',
            initial: 'views/home.html',
            transition: 'slide'
        });
    },
    _bindEvents: function () {
        document.addEventListener('deviceready', this._onDeviceReady, false);
    },

    _onDeviceReady: function () {
        navigator.splashscreen.hide();
        this._getGeolocation();
    },

    _initPlugins: function () {
        this.flashlight = new FlashlightWrapper();
        this.gps = new GPSWrapper();
    },

    kendoApp: null,
    flashlight: null,
    gps: null
};

//function _getPosition(position) {
//    var latitude = position.coords.latitude;
//    var longitude = position.coords.longitude;
//    _reverseGeocode(latitude, longitude);
//}

//function _positionError() {
//    alert('Could not find the current location.');
//}

//function _reverseGeocode(latitude, longitude) {
//    var reverseGeocoder = new google.maps.Geocoder();
//    var currentPosition = new google.maps.LatLng(latitude, longitude);
//    reverseGeocoder.geocode({ 'latLng': currentPosition }, function (results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//            if (results[0]) {
//                var splittedAddress = results[0].formatted_address.split(',');
//                var formattedAddress = splittedAddress[0] + '<br />' + splittedAddress[1] + '<br />' + splittedAddress[2];
//                $('#gps-location-info span').html(formattedAddress);
//            }
//            else {
//                alert('Unable to detect your address.');
//            }
//        } else {
//            alert('Unable to detect your address.');
//        }
//    });
//}

//$(function () {
//    var options = { enableHighAccuracy: true };
//    navigator.geolocation.getCurrentPosition(_getPosition, _positionError, options);
//});
