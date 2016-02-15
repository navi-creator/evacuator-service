angular
    .module('Evacuator', [
        'angular-meteor',
        'ionic',
        'uiGmapgoogle-maps',
        'evaceator.controllers'
    ])

    .run(function($ionicHistory, $rootScope, $ionicPlatform){
        $rootScope.goBack = function() { $ionicHistory.goBack(); };
        ionic.Platform.showStatusBar(false);
        ionic.Platform.fullScreen();
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);
        }

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


angular
    .module('Evacuator')
    .config(config);

function config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({v: '3.21', libraries: 'geometry,places', language:'ru-RU'});


    $stateProvider
        .state('start', {
            url: '/start',
            templateUrl: 'client/templates/start.html'
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'client/templates/sign/signin.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'client/templates/sign/signup.html'
        })
        .state('app.map01', {
            url: '/map01',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/map01.html',
                    controller: 'MapCtrl'
                }
            }
        })
        .state('app.map02', {
            url: '/map02',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/map02.html'
                    //controller: ''
                }
            }
        })
        .state('app.map03', {
            url: '/map03',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/map03.html'
                    //controller: ''
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/profile.html'
                    //controller: ''
                }
            }
        })
        .state('app.service', {
            url: '/service',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/service.html'
                    //controller: ''
                }
            }
        })
        .state('app.contact', {
            url: '/contact',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/contact.html'
                    //controller: ''
                }
            }
        })
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'client/templates/menus.html',
            controller: 'LeftMenuCrt'
        });
    $urlRouterProvider.otherwise('start');
}

