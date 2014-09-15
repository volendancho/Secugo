function FlashlightWrapper() {
    var that = this;
    this._flashlight = window.plugins.flashlight;
    this._flashlight.available(function (isAvailable) {
        that._available = isAvailable;
    });
}

FlashlightWrapper.prototype = {

    toggle: function () {
        if (this._available) {
            this._flashlight.toggle();
        }
    },
    switchOn: function(){
        if (this._available) {
            this._flashlight.switchOn();
        }
    },
    switchOff: function () {
        if (this._available) {
            this._flashlight.switchOff();
        }
    },

    _available: null,
    _flashlight: null,
};