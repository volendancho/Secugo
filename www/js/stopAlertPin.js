StopAlertPinView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);

        this._passwordInput = this._view.content.find('input[type=password]');
        this.resetPin();
        // TODO: ...
    },

    resetPin: function () {
        this._passwordInput.val('');
    },
    confirmPin: function() {
        // TODO: ...
    },

    _passwordInput: null
});



$.extend(app, {
    onStopAlertPinViewShow: function (e) {
        app.stopAlertPinView.reset(e.view);
    },
    stopAlertPinView: new StopAlertPinView(app)
});
