angular.module('choreApp', [])

.controller('ChoreCtrl', function($scope) {
  $scope.logChore = function (ch) {
    alert(ch + " is done");
  }
})

.directive('kid', function() {
  return {
    restrict: 'E',
    scope: {
      done: '&' // 用来方法调用
    },
    template: '<input type="text" ng-model="chore"> {{ chore }}' +
              '<div class="button" ng-click="done({chore:chore})">I\'m done</div>',
    controller: function($scope) {
      console.log($scope)
    }
  };
})