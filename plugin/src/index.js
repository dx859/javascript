var Selectize = require('./select')




function createInput() {
  var input = document.createElement('input');
  input.placeholder = 'hello';
  input.type = 'text';
  return input
}


function main() {
  var input = createInput();
  document.body.appendChild(input);
  var select = new Selectize(input);
}

main();