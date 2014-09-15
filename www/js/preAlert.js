PreAlertView = ObservableView.extend({

    preAlertAggressionClick: function () {
        this._showMinutes('aggression');
    },
    preAlertMedicalClick: function () {
        this._showMinutes('medical');
    },
    showTimer1Minute: function () {
        this._startTimer(1);
    },
    showTimer2Minutes: function () {
        this._startTimer(2);
    },
    showTimer3Minutes: function () {
        this._startTimer(3);
    },
    stopAlertClick: function () {
        this._stopAlert();
        this.goBack();
    },
    resetAlert: function () {
        if (!this._alertStarted) {
            this._stopAlert();
            this._startTimer(_minutes);
        } else {
            this.set('AlertTimeout', 'An alert has already been sent!');
        }
    },
    alertViewHide: function () {
        this._stopAlert();
    },
    immediateAlertAggression: function () {
        this._startImmediateAlert('aggression');
    },
    immediateAlertMedical: function () {
        this._startImmediateAlert('medical');
    },

    _initView: function () {
        ObservableView.fn._initView.call(this);
    },
    _showMinutes: function () {
        $('.km-widget.km-view#preAlert .countdown').addClass('countdown-slide');
    },
    _startTimer: function (minutes) {
        $('.km-widget.km-view#preAlert .countdown-timer').addClass('countdown-slide');

        _minutes = minutes;
        RemTime = _minutes * 60;
        var result = this._convertSeconds(RemTime);
        this.set('AlertTimeout', result);

        var that = this;
        this._alertTimer = window.setInterval(function () {
            that._tryStartAlert();
        }, this.TIMER_INTERVAL);
    },
    _stopAlertTimer: function () {
        if (this._alertTimer) {
            window.clearInterval(this._alertTimer);
            this._alertTimer = null;
        }
    },
    _tryStartAlert: function () {
        RemTime -= 1;
        var result = this._convertSeconds(RemTime);
        this.set('AlertTimeout', result);

        if (RemTime === 0) {
            this._stopAlertTimer();
            this._startAlert();
        }
    },
    _startAlert: function (preAlertType) {
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
    _convertSeconds: function (time) {
        var minutes = parseInt(time / 60) % 60;
        var seconds = time % 60;

        var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        return result;
    },
    _startImmediateAlert: function (type) {
        if (!this._alertStarted) {
            $('.km-widget.km-view#preAlert .countdown-timer').addClass('countdown-slide');
            this._stopAlertTimer();
            this._startAlert(type);
        } else {
            this.set('AlertTimeout', 'An alert has already been sent!');
        }
    },

    _alertStarted: false,
    _alertTimer: null,
    _minutes: null,

    AlertTimeout: null,
    RemTime: null,

    TIMER_INTERVAL: 1000
});



$.extend(app, {
    onPreAlertViewShow: function (e) {
        app.preAlertView.reset(e.view);
    },
    onPreAlertViewHide: function () {
        $('.km-widget.km-view#preAlert .countdown-timer').removeClass('countdown-slide');
        $('.km-widget.km-view#preAlert .countdown').removeClass('countdown-slide');
        app.preAlertView.alertViewHide();
    },
    preAlertView: new PreAlertView(app)
});
