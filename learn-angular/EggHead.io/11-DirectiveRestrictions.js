angular.module('superhero', [])

.directive('superman', function() {
  return {
    restrict: 'A',
    link: function() {
      alert("I'm working stronger!");
    }
  };
})

.directive('flash', function() {
  return {
    restrict: 'A',
    link: function() {
      alert("I'm working faster!");
    }
  }
})