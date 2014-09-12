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

    _initView: function () {
        ObservableView.fn._initView.call(this);
    },
    _showMinutes: function () {
        $('.km-widget.km-view#preAlert .countdown').addClass('countdown-slide');
    },
    _startTimer: function (minutes) {
        $('.km-widget.km-view#preAlert .countdown-timer').addClass('countdown-slide');
        $('.km-widget.km-view#preAlert .countdown-minutes').hide();

        RemTime = minutes * 60;

        var result = '0' + minutes + ':00';
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
        var minutes = parseInt(RemTime / 60) % 60;
        var seconds = RemTime % 60;

        var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

        this.set('AlertTimeout', result);

        if (RemTime === 0) {
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

    _alertStarted: false,
    _alertTimer: null,

    AlertTimeout: null,
    RemTime: null,

    TIMER_INTERVAL: 1000
});



$.extend(app, {
    onPreAlertViewShow: function (e) {
        app.preAlertView.reset(e.view);
    },
    onPreAlertViewHide: function () {
        $('.km-widget.km-view#preAlert .countdown').removeClass('countdown-slide');
        $('.km-widget.km-view#preAlert .countdown-timer').removeClass('countdown-slide');
    },
    preAlertView: new PreAlertView(app)
});
