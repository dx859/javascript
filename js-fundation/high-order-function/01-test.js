/* Higher-Order-Function */

function greaterThan(n) {
  return function (m) {
    return m > n
  };
}

var greaterThan10 = greaterThan(10);
// console.log(greaterThan10(11));

function unless(bool, then) {
  if(bool) then();
}

function repeat(times, action) {
  for(var i = 0; i < times; i++) action(i);
}

repeat(10, function(n) {
  unless(n%2, function() {
    console.log("%d is even", n);
  });
});
