function extend(newObj, oldObj) {
    for (var attr in oldObj) {
        newObj[attr] = oldObj[attr];
    }
    return newObj;
}

function viewWidth() {
    return document.documentElement.clientWidth;
}

function viewHeight() {
    return document.documentElement.clientHeight;
}

function hasClass(element, className) {
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return re.test(element.className);
}

function addClass(element, className) {
    if (hasClass(element, className)) return;

    var newClass = element.className.split(' ');
    newClass.push(className);
    element.className = newClass.join(' ');
}

function removeClass(element, className) {
    if (!hasClass(element, className)) return;

    var re = new RegExp("(^|\\s)" + className + "(\\s|$)", 'g');
    element.className = element.className.replace(re, ' ');
}

function buildDOM(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    if (tmp.children.length === 1)
        return tmp.children[0];
    else
        return tmp;
}

function parseHTML(html, context) {
    context = context || document;
    var SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
    var parsed;

    if ((parsed = SINGLE_TAG_REGEXP.exec(html))) {
        return [context.createElement(parsed[1])];
    }

    if ((parsed = SINGLE_TAG_REGEXP.exec(html))) {
        return parsed.childNodes;
    }

    return [];
}


export {
    extend,
    viewWidth,
    viewHeight,
    buildDOM,
    parseHTML,
    hasClass,
    addClass,
    removeClass
};
