/*(function() {
  var root = this;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    } else {
      root._ = _;
    }
  }

}).call(this);*/
var 
  ArrayProto = Array.prototype,
  ObjProto = Object.prototype,
  FuncProto = Function.prototype;

var
  push = ArrayProto.push,
  slice = ArrayProto.slice,
  toString = ObjProto.toString,
  hasOwnProperty = ObjProto.hasOwnProperty;

var
  nativeIsArray = Array.isArray,
  nativeKeys = Object.keys,
  nativeBind = FuncProto.bind,
  nativeCreate = Object.create;



var Ctor = function() {};

var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

_.VERSION = '0.0.1';

var optimizeCb = function(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 3:
      return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
  }
};

_.each = _.forEach = function(obj, iteratee, context) {
  if (obj == null) return obj;
  iteratee = optimizeCb(iteratee, context);
  var i, length = obj.length;
  if (length === +length) {
    for (i = 0; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};

_.keys = function(obj) {
  if (!_.isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var keys = [];
  for (var key in obj) if (_.has(obj, key)) keys.push(key);
  // if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

_.has = function(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
};

_.isObject = function(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}

module.exports = _;