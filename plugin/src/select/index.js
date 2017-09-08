var Selectize = function(input, settings) {
  this.input = input;
  this.settings = settings ||　{};
  this.init()
};


Selectize.prototype = {
  constructor: Selectize,
  init: function() {

    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('blur', this.onFlur);
  },
  onFocus: function() {

  },
  onFlur: function() {

  },
}

module.exports = Selectize;