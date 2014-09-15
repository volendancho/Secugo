var app = {
    // Application Constructor
    initialize: function () {
        this.initKendo();
        this.bindEvents();
    },
    initKendo: function () {
        this.kendoApp = new kendo.mobile.Application(document.body, {
            layout: 'default',
            initial: 'views/home.html',
            transition: 'slide'
        });
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        navigator.splashscreen.hide();
        this._getGeolocation();

    },
    _getGeolocation: function () {
        var options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(_getPosition, _positionError, options);
    },

    _getPosition: function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        _reverseGeocode(latitude, longitude);
    },

    _positionError: function () {
        navigator.notification.alert('Could not find the current location.');
    },

    _reverseGeocode: function (latitude, longitude) {
        var reverseGeocoder = new google.maps.Geocoder();
        var currentPosition = new google.maps.LatLng(latitude, longitude);
        reverseGeocoder.geocode({ 'latLng': currentPosition }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    navigator.notification.alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                    $('.table-cell-middle').text(results[0].formatted_address);
                }
                else {
                    navigator.notification.alert('Unable to detect your address.');
                }
            } else {
                navigator.notification.alert('Unable to detect your address.');
            }
        });
    },

    //_getLocation: function (options) {
    //    var dfd = new $.Deferred();

    //    //Default value for options
    //    if (options === undefined) {
    //        options = { enableHighAccuracy: true };
    //    }

    //    navigator.geolocation.getCurrentPosition(
    //        function (position) {
    //            dfd.resolve(position);
    //        },
    //        function (error) {
    //            dfd.reject(error);
    //        },
    //        options);

    //    return dfd.promise();
    //},
    //_getAddressFromCoordinates: function (position) {
    //    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //    $.ajax({
    //        type: 'GET',
    //        url: 'http://maps.google.com/maps/api/geocode/xml?latlng={0}&sensor=false'.Format(latlng),
    //        success: function (response) {
    //            console.log(response);
    //        },
    //        error: function (e) {
    //            var responseObject = $.parseJSON(e.responseText);
    //            alert(responseObject.Message);
    //        }
    //    });
    //},


    kendoApp: null
};

//function getLocation() {
//    navigator.geolocation.getCurrentPosition(
//        function (position) {
//            console.log(position);
//            return position;
//        },
//        function (error) {
//            alert(error.message);
//        });
//}

//console.log(getLocation());
//var position = getLocation();
////var latitude = position.coords.latitude;
////var longitude = position.coords.longitude;

//var latitude = 43.204665;
//var longitude = 27.910542;

//(function () {
//    var geocoder;

//    geocoder = new google.maps.Geocoder();
//    var latlng = new google.maps.LatLng(latitude, longitude);

//    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
//        console.log(results);
//        if (status == google.maps.GeocoderStatus.OK) {
//            if (results[0]) {
//                var add = results[0].formatted_address;
//                var value = add.split(",");

//                count = value.length;
//                country = value[count - 1];
//                state = value[count - 2];
//                city = value[count - 3];
//                alert("city name is: " + city);
//            }
//            else {
//                alert("Address not found!");
//            }
//        }
//        else {
//            //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
//            //alert("Geocoder failed due to: " + status);
//        }
//    });
//})();
