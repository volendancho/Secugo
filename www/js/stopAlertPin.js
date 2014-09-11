StopAlertPinView = ObservableView.extend({
    _initView: function () {
        ObservableView.fn._initView.call(this);

        this.resetPin();
        this.set('RemainingAttempts', this.DEFAULT_ATTEMPTS);
    },

    enterPin: function () {
        var pin = this.get('PIN');
        pin += $(event.target).text();
        this.set('PIN', pin);
    },
    resetPin: function () {
        this.set('PIN', '');
    },
    confirmPin: function() {
        var pin = this.get('PIN');
        if (pin === this.THE_PIN) {
            this._app.alertView.stopByPin();
            this.goBack();
        } else {
            alert('Invalid PIN!');
            var remAttempts = this.get('RemainingAttempts') - 1;
            this.set('RemainingAttempts', remAttempts);
            if (remAttempts === 0) {
                this.goBack();
            }
        }
    },


    RemainingAttempts: 3,
    PIN: '',

    DEFAULT_ATTEMPTS: 3,
    THE_PIN: '3572'
});



$.extend(app, {
    onStopAlertPinViewShow: function (e) {
        app.stopAlertPinView.reset(e.view);
    },
    stopAlertPinView: new StopAlertPinView(app)
});
