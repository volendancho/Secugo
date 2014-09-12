function CameraWrapper(captureSuccess, fileSuccess) {
    this._photoDataSuccessCallback = captureSuccess;
    this._photoURISuccessCallback = fileSuccess;
}

CameraWrapper.prototype = {

    capturePhoto: function () {
        var that = this;

        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(
            function () {
                that._onPhotoDataSuccess.apply(that, arguments);
            }, function () {
                that._onFail.apply(that, arguments);
            }, {
                quality: 100,
                encodingType: navigator.camera.EncodingType.JPEG,
                correctOrientation: false,
                destinationType: navigator.camera.DestinationType.DATA_URL
            }
        );
    },
    capturePhotoEdit: function () {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function () {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
            quality: 50,
            allowEdit: true,
            destinationType: navigator.camera.DestinationType.DATA_URL
        });
    },
    getPhotoFromLibrary: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
    },
    getPhotoFromAlbum: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(navigator.camera.PictureSourceType.SAVEDPHOTOALBUM)
    },

    _getCapturedImageSrc: function(imageData){
        return 'data:image/jpeg;base64,' + imageData;
    },
    _getFileImageSrc: function (imageURI) {
        return imageURI;
    },

    _getPhoto: function (source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function () {
            that._onPhotoURISuccess.apply(that, arguments);
        }, function () {
            cameraApp._onFail.apply(that, arguments);
        }, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: source
        });
    },

    _onPhotoDataSuccess: function (imageData) {
        if (this._photoDataSuccessCallback) {
            var uri = this._getCapturedImageSrc(imageData);
            this._photoDataSuccessCallback(uri, imageData);
        }
    },
    _onPhotoURISuccess: function (imageURI) {
        if (this._photoURISuccessCallback) {
            var src = this._getFileImageSrc(imageURI);
            this._photoURISuccessCallback(imageURI);
        }
    },
    _onFail: function (message) {
        alert(message);
    },

    _photoDataSuccessCallback: null,
    _photoURISuccessCallback: null,
}