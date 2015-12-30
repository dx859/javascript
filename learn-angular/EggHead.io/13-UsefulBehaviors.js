angular.module('behaviorApp', [])

.directive('enter', function () {
  return function (scope, element, attrs) {
    element.bind('mouseenter', function () {
      element.addClass(attrs.enter);
    })
  }
})

.directive('leave', function () {
  return function (scope, element, attrs) {
    element.bind('mouseleave', function () {
      element.removeClass(attrs.enter);
    })
  }
})

