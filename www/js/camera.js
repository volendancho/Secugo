CameraView = ObservableView.extend({
    init: function(app){
        ObservableView.fn.init.call(this, app);

        var that = this;
        this._camera = new CameraWrapper(
            null,
            function () {
                that._photoOpened.apply(that, arguments);
            }
        );
    },

    cameraClick: function () {
        this._app.flashlight.switchOff();
        this._camera.capturePhoto();
    },
    albumClick: function () {
        this._camera.getPhotoFromLibrary();
    },
    closePhotoClick: function () {
        this._resetImage();
        return false;
    },

    _initView: function () {
        ObservableView.fn._initView.call(this);

        this._resetImage();
    },

    _photoOpened: function (uri) {
        this._showImage(uri);
    },
    _showImage: function (uri) {
        this.set('ImageUri', uri);
        this.set('Captured', true);
    },
    _resetImage: function(){
        this.set('ImageUri', '');
        this.set('Captured', false);
    },

    _camera: null,

    ImageUri: null,
    Captured: false
});



$.extend(app, {
    onCameraViewShow: function (e) {
        app.cameraView.reset(e.view);
    },
    cameraView: new CameraView(app)
});
