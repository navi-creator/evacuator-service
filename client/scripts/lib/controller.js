/**
 * Created by Viktor Goncharov1 on 12.02.2016.
 */

angular.module('evaceator.controllers', [])


    .controller('MapAvto', function($scope, $ionicHistory, $ionicPopup, $state, $ionicModal, $timeout, uiGmapGoogleMapApi) {
        uiGmapGoogleMapApi.then(function(maps) {});
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            events: {}
        };
    })
