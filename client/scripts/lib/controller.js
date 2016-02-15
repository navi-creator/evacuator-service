/**
 * Created by Viktor Goncharov1 on 12.02.2016.
 */

angular.module('evaceator.controllers', [])


   /* .controller('MapAvto', function($scope, $ionicHistory, $ionicPopup, $state, $ionicModal, $timeout, uiGmapGoogleMapApi) {
        uiGmapGoogleMapApi.then(function(maps) {});
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            events: {}
        };
    })*/

    .controller('MapCtrl', function($scope, $ionicLoading, $rootScope, $compile, uiGmapGoogleMapApi, gmapsScope) {
        uiGmapGoogleMapApi.then(function(maps) {});
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $scope.centerOnMe = function() {
            gmapsScope.centerOnMe();
        };

    })

    .service('gmapsScope', function($ionicLoading, $ionicPopup) {
    var scope = null;
    return {
        set: function(value) {
            scope = value;
        },
        get: function() {
            return scope;
        },
        centerOnMe: function() {
            if(!scope) {
                return;
            }

            $ionicLoading.show({
                content: 'Определяем текущую позицию...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function(pos) {
                console.log('Getting current location...')
                scope.my.coords = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
                //scope.loc.coords =  { latitude: pos.coords.latitude, longitude: pos.coords.longitude };

                var coords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                scope.map.control.getGMap().setCenter(coords);
                if (scope.onChangeCenter)
                    scope.onChangeCenter(coords);

                $ionicLoading.hide();
            }, function(error) {
                $ionicLoading.hide();
                if (error.code == 1)
                    $ionicPopup.alert({ title: 'Ошибка', template: 'Разрешите определить вашу геопозицию. Мы найдем ближайшие клиники и врачей.'});
                else if (error.code == 2)
                    $ionicPopup.alert({ title: 'Ошибка', template: 'Невозможно определить вашу геопозицию.'});
                else if (error.code == 3)
                    $ionicPopup.alert({ title: 'Ошибка', template: 'Невозможно определить вашу геопозицию.'});
                else $ionicPopup.alert({ title: 'Ошибка', template: error.message});
            });
        }
    };
})

    .controller('LeftMenuCrt', function($scope, $state, $ionicLoading, $rootScope, $compile, uiGmapGoogleMapApi, gmapsScope) {
        $scope.onExit = function() {

                $state.go('signin');

        };

    })

