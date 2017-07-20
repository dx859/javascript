var el = require('./libs/element')

var ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
])

var ulRoot = ul.render()

window.onload = function() {
  document.body.appendChild(ulRoot)
}