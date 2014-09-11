StopAlertPinView = kendo.data.ObservableObject.extend({
    init: function (app) {
        kendo.data.ObservableObject.fn.init.apply(this, [this]);
        this._app = app;
    },
    reset: function (view) {
        this._view = view;
    },

    _goBack: function () {
        this._app.kendoApp.navigate('#:back');
    },

    _app: null,
    _view: null
});



$.extend(app, {
    onStopAlertPinViewShow: function (e) {
        app.stopAlertPinView.reset(e.view);
    },
    stopAlertPinView: new StopAlertPinView(app)
});
