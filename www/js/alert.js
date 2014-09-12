AlertView = ObservableView.extend({

    stopAlertClick: function () {
        if (!this._alertStarted) {
            if (this._alertType === 'aggression') {
                this._app.kendoApp.navigate('views/stopAlertPin.html');
            } else {
                this._stopAlert();
                this.goBack();
            }
        }
    },
    aggressionThreatClick: function () {
        if (!this._alertStarted) {
            this._stopAlertTimer();
            this._startAlert();
        }
    },
    stopByPin: function () {
        this._stoppedByPin = true;
        this._stopAlert();
    },

    _initView: function () {
        ObservableView.fn._initView.call(this);

        if (this._stoppedByPin) {
            this._stoppedByPin = false;
            this.goBack();
        } else {
            this.set('AlertTimeout', this.ALERT_TIMEOUT);
            this._alertStarted = false;
            this._startAlertTimer();
            this._alertType = this._view.params.type;
        }
    },
    _startAlertTimer: function () {
        var that = this;
        this._alertTimer = window.setInterval(function () {
            that._tryStartAlert();
        }, this.TIMER_INTERVAL);
    },
    _stopAlertTimer: function () {
        if (this._alertTimer) {
            window.clearInterval(this._alertTimer);
            this._alertTimer = null;
            this.set('AlertTimeout', this.ALERT_TIMEOUT);
        }
    },
    _tryStartAlert: function () {
        var remTime = this.get('AlertTimeout') - 1;
        this.set('AlertTimeout', remTime);
        if (remTime === 0) {
            this._stopAlertTimer();
            this._startAlert();
        }
    },
    _startAlert: function () {
        this._alertStarted = true;
        this._app.currentAlert = {
            deviceUUID: '', // TODO: Get device UUID.
            id: 100,
            type: this._view.params.type
        }; // TODO: AJAX to send notification + Receive ID.
        this.set('AlertTimeout', 'Alert sent');
    },
    _stopAlert: function () {
        this._stopAlertTimer();
        this._app.currentAlert = null;
    },

    _alertType: null,
    _stoppedByPin: false,
    _alertStarted: false,
    _alertTimer: null,

    AlertTimeout: 5,

    ALERT_TIMEOUT: 5,
    TIMER_INTERVAL: 1000
});



$.extend(app, {
    onAlertViewShow: function (e) {
        app.alertView.reset(e.view);
    },
    alertView: new AlertView(app)
});
