CameraView = ObservableView.extend({
    init: function(app){
        ObservableView.fn.init.call(this, app);

        var that = this;
        //this._camera = new CameraWrapper(
        //    function () {
        //        that._photoCaptured.apply(this, arguments);
        //    },
        //    function () {
        //        that._fileOpened.apply(this, arguments);
        //    }
        //);
    },

    cameraClick: function () {
        $(event.target).closest('div.tile').html('<h1>OK</h1>');
        //this._camera.capturePhoto();
    },
    closePhotoClick: function () {
        this._resetImage();
    },

    _initView: function () {
        ObservableView.fn._initView.call(this);

        this._resetImage();
    },

    _photoCaptured: function (uri, imageData) {
        this._showImage(uri);
    },
    _photoOpened: function (uri) {
        this._showImage(uri);
    },
    _showImage: function(uri){
        this.set('ImageUri', uri);
        this.set('Catured', true);
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
