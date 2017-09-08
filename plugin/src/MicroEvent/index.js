var MicroEvent = function() {};
MicroEvent.prototype.on = function(event, fn) {
  this._events = this._events || {};
  this._events[event] = this._events[event] || [];
  this._events[event].push(fn);
};

MicroEvent.prototype.off = function(event, fn) {
  var n = arguments.length;
  if (0 === n) return delete this._events;
  if (1 === n) return delete this._events[event];

  this._events = this._events || {};
  if (event in this._events === false) return;
  if (fn in this._events[event])
    this._events[event].splice(this._events[event].indexOf(fn), 1);
};

MicroEvent.prototype.fire = function(event) {
  this._events[event] = this._events[event] || [];
  for (var i = 0; i < this._events[event].length; i++) {
    this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
  }
};

module.exports = MicroEvent;