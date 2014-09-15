RescuesView = ObservableView.extend({

    _initView: function () {
        ObservableView.fn._initView.call(this);

    },
});



$.extend(app, {
    onRescuesViewShow: function (e) {
        app.rescuesView.reset(e.view);
    },
    rescuesView: new RescuesView(app)
});
