PreAlertView = ObservableView.extend({

    preAlertAggressionClick: function () {
        this._showMinutes('aggression');
    },
    preAlertMedicalClick: function () {
        this._showMinutes('medical');
    },
    showTimer1Minute: function () {
        this._initTimer(1);
    },
    showTimer2Minutes: function () {
        this._initTimer(2);
    },
    showTimer3Minutes: function () {
        this._initTimer(3);
    },

    _initView: function () {
        ObservableView.fn._initView.call(this);
    },
    _showMinutes: function () {
        $('.km-widget.km-view#preAlert .countdown').addClass('countdown-slide');
    },
    _initTimer: function (minutes) {
        $('.km-widget.km-view#preAlert .countdown-timer').addClass('countdown-slide');
        $('.km-widget.km-view#preAlert .countdown-minutes').hide();
    }
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
