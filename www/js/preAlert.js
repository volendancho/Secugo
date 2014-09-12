PreAlertView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);
    },



});



$.extend(app, {
    onPreAlertViewShow: function (e) {
        app.preAlertView.reset(e.view);
    },
    preAlertView: new PreAlertView(app)
});