angular
    .module('Evacuator', [
      'angular-meteor',
      'ionic'
    ]).run(function($ionicHistory,$rootScope){
    $rootScope.goBack = function() { $ionicHistory.goBack(); };
});

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
function onReady() {
  angular.bootstrap(document, ['Evacuator']);
}
