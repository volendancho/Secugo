StopAlertPinView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);
        // TODO: ...
    },
});



$.extend(app, {
    onStopAlertPinViewShow: function (e) {
        app.stopAlertPinView.reset(e.view);
    },
    stopAlertPinView: new StopAlertPinView(app)
});
