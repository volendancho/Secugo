CameraView = ObservableView.extend({

    _initView: function () {
        ObservableView.fn._initView.call(this);
    },

});



$.extend(app, {
    onCameraViewShow: function (e) {
        app.cameraView.reset(e.view);
    },
    cameraView: new CameraView(app)
});
