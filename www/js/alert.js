AlertView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);

        if (!this._app.currentAlert) {
            // TODO: 5 secs to send...
            this._app.currentAlert = {
                deviceUUID: '', // Get device UUID.
                id: 100,
                type: this._view.params.type
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
        this.goBack();
    },
});



$.extend(app, {
    onAlertViewShow: function (e) {
        app.alertView.reset(e.view);
    },
    alertView: new AlertView(app)
});
