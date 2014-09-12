HomeView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);
    },

    goToPreAlert: function () {
        this._app.kendoApp.navigate('views/preAlert.html');
    },

    goToAlertFire: function () {
        this._navigateToAlert('fire');
    },

    goToAlertEmergency: function () {
        this._navigateToAlert('emergency');
    },

    goToAlertAggression: function () {
        this._navigateToAlert('aggression');
    },

    _navigateToAlert: function (type) {
        this._app.kendoApp.navigate('views/alert.html?type=' + type);
    }
});



$.extend(app, {
    onHomeViewShow: function (e) {
        app.homeView.reset(e.view);
    },
    homeView: new HomeView(app)
});
