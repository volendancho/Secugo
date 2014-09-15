var app = {
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
    },

    _initPlugins: function () {
        //this.flashlight = new FlashlightWrapper();
        this.gps = new GPSWrapper();
    },

    kendoApp: null,
    flashlight: null,
    gps: null
};
