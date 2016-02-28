import Scroll from './scroll';
import {hasClass} from './util';

let oDiv = document.querySelector('#wrapper');

function renderDOM(parent) {
    let fragment = document.createDocumentFragment();

    for (let i=0; i<100; i++) {
        let li = document.createElement('li');
        li.innerHTML = '这是第' + i + '行';
        li.style.lineHeight = '44px';
        fragment.appendChild(li);
    }

    parent.appendChild(fragment);
}

renderDOM(oDiv);

var wrap = document.getElementById('content');
var scroll = new Scroll(wrap);

