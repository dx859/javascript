function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
}

function isArrayForConstru(value) {
    return value.constructor == Array;
}

function isArrayForInstance(value) {
    return value instanceof Array;
}

window.onload = function() {
    var oF = document.createElement('iframe');
    document.body.appendChild(oF);

    var ifArray = window.frames[0].Array;
    var arr = new ifArray();
    // alert( isArray(arr));
    // alert( isArrayForConstru(arr));
    // alert( isArrayForInstance(arr));
};

var arr = [1,2,3];
// alert(isArray(arr));
// alert(isArrayForConstru(arr));
// alert(isArrayForInstance(arr));
