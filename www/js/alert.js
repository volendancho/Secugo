function Alert(view) {
    this.init(view);
}
Alert.prototype = {
    init: function (view) {
        this._type = view.params.type;
        // init: the controls...
    },

    _view: null,
    _type: null
}