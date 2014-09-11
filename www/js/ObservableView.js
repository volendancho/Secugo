ObservableView = kendo.data.ObservableObject.extend({
    init: function (app) {
        kendo.data.ObservableObject.fn.init.apply(this, [this]);
        this._app = app;
    },
    reset: function (view) {
        this._view = view;
        this._initView();
    },
    goBack: function () {
        this._app.kendoApp.navigate('#:back');
    },

    _initView: function () {
    },

    _app: null,
    _view: null
});
