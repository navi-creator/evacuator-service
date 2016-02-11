angular
    .module('Evacuator')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('start', {
            url: '/start',
            templateUrl: 'client/templates/start.html'
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'client/templates/signin.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'client/templates/signup.html'
        })
        .state('app.map01', {
            url: '/map01',
            views:{
                'menuContent': {
                    templateUrl: 'client/templates/map01.html',
                    //controller: ''
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
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'client/templates/menus.html'
            //controller: 'LeftMenuCtrl'
        });
    $urlRouterProvider.otherwise('start');
}