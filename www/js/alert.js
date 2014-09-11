AlertView = kendo.data.ObservableObject.extend({
    init: function (app) {
        kendo.data.ObservableObject.fn.init.apply(this, [this]);
        this._app = app;
    },
    reset: function (view) {
        this._view = view;
        this._type = view.params.type;

        if (!this._app.currentAlert) {
            // TODO: 5 secs to send...
            this._app.currentAlert = {
                deviceUUID: '', // Get device UUID.
                id: 100,
                type: view.params.type
            }; // TODO: AJAX to send notification + Receive ID.
        }
    },
    stopAlertClick: function () {
        if (this._app.currentAlert.type === 'aggression') {
            this._app.kendoApp.navigate('views/stopAlertPin.html');
        } else {
            this._stopAlert();
        }
    },

    _stopAlert: function () {
        // TODO: AJAX to stop alert
        this._app.currentAlert = null;
        this._goBack();
    },
    _goBack: function () {
        this._app.kendoApp.navigate('#:back');
    },

    _app: null,
    _view: null
});



$.extend(app, {
    onAlertViewShow: function (e) {
        app.alertView.reset(e.view);
    },
    alertView: new AlertView(app)
});
