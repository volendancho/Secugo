function GPSWrapper() {
    this._getGeolocation();
}

GPSWrapper.prototype = {

    _getGeolocation: function () {
        var options = { timeout: 30000, enableHighAccuracy: true };
        var that = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                that._reverseGeocode(latitude, longitude);
            },
            function () {
                navigator.notification.alert('Could not find the current location.');
            },
            options);
    },

    _reverseGeocode: function (latitude, longitude) {
        var reverseGeocoder = new google.maps.Geocoder();
        var currentPosition = new google.maps.LatLng(latitude, longitude);
        reverseGeocoder.geocode({ 'latLng': currentPosition }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var splittedAddress = results[0].formatted_address.split(',');
                    var formattedAddress = splittedAddress[0] + '<br />' + splittedAddress[1] + '<br />' + splittedAddress[2];

                    $('#gps-location-info span').html(formattedAddress);
                }
                else {
                    navigator.notification.alert('Unable to detect your address.');
                }
            } else {
                navigator.notification.alert('Unable to detect your address.');
            }
        });
    }
};
