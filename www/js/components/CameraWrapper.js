function CameraWrapper(captureSuccess, openSuccess) {
    this._captureSuccess = captureSuccess;
    this._openSuccess = openSuccess;
}

CameraWrapper.prototype = {

    capturePhoto: function () {
        var that = this;

        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(
            function () {
                that._onCaptureSuccess.apply(that, arguments);
            }, function () {
                that._onFail.apply(that, arguments);
            }, {
                quality: 100,
                encodingType: navigator.camera.EncodingType.JPEG,
                correctOrientation: false,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: true
            }
        );
    },
    capturePhotoEdit: function () {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function () {
            that._onCaptureSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
            quality: 100,
            allowEdit: true,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
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

    _getDataImageSrc: function(imageData) {
        return 'data:image/jpeg;base64,' + imageData;
    },
    _getFileImageSrc: function (imageURI) {
        return imageURI;
    },

    _getPhoto: function (source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function () {
            that._onOpenSuccess.apply(that, arguments);
        }, function () {
            cameraApp._onFail.apply(that, arguments);
        }, {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: source
        });
    },

    _onCaptureSuccess: function (imageData) {
        if (this._captureSuccess) {
            var uri = this._getDataImageSrc(imageData);
            this._captureSuccess(uri, imageData);
        }
    },
    _onOpenSuccess: function (imageURI) {
        if (this._openSuccess) {
            var src = this._getFileImageSrc(imageURI);
            this._openSuccess(imageURI);
        }
    },
    _onFail: function (message) {
        //alert(message);
    },

    _captureSuccess: null,
    _openSuccess: null,
};
