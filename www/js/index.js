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
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function () {
    },


    kendoApp: null
};
