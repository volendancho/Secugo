PreAlertView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);
    },

    preAlertAggressionClick: function () {
        this._showTimer('aggression');
    },

    preAlertMedicalClick: function () {
        this._showTimer('medical');
    },

    _showTimer: function () {
        $('.km-widget.km-view#preAlert .countdown').addClass('countdown-slide');
    }
});



$.extend(app, {
    onPreAlertViewShow: function (e) {
        app.preAlertView.reset(e.view);
    },
    preAlertView: new PreAlertView(app)
});
