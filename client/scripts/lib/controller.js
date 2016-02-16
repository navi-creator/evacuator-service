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

    .controller('MapCtrl', function($scope, $ionicLoading, $ionicModal, $rootScope, $compile, uiGmapGoogleMapApi, gmapsScope, $timeout, uiGmapIsReady) {
        gmapsScope.set($scope);
        $scope.my={};
        $scope.geoTitle={};
        var geocoder;
        uiGmapGoogleMapApi.then(function(maps) {
            console.log('uiGmapGoogleMapApi')
            geocoder = new google.maps.Geocoder();
            gmapsScope.centerOnMe();
        });

        var lastPos;
        var searchEventTimeout;

        $scope.onChangeCenter = function(pos) {

            if (searchEventTimeout) $timeout.cancel(searchEventTimeout);
            searchEventTimeout = $timeout(function () {
                if (lastPos != pos) {
                    lastPos = pos;
                    geocoder.geocode({'location': pos}, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                $scope.$apply(function () {
                                    $scope.geoTitle = results[0].formatted_address;
                                });
                            } else {
                                console.log('No results found');
                            }
                        } else {
                            console.log('Geocoder failed due to: ' + status);
                        }
                    });
                }
            }, 350);
        };

        uiGmapIsReady.promise().then(function() {
            console.log("uiGmapIsReady")

            $scope.map.options.mapTypeId = google.maps.MapTypeId.ROADMAP;

            var remove_poi = [
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }
            ];

            $scope.map.control.getGMap().setOptions({styles: remove_poi})

            var coords = $scope.map.control.getGMap().getCenter();
            $scope.onChangeCenter(coords);

            $scope.map.control.getGMap().addListener('dragend', function() {
                var coords = $scope.map.control.getGMap().getCenter();
                $scope.onChangeCenter(coords);
                //$scope.loc.coords =  { latitude: coords.lat(), longitude: coords.lng() };
                //$scope.loc.coords = coords;
            });
        });

        $scope.map = { center: { latitude: 55.7508107, longitude: 37.6280704 }, zoom: 15,
            options: {
                zoomControl: false,
                draggable: true,
                rotateControl: false,
                scrollwheel: false,
                streetViewControl: false,
                disableDefaultUI: true,
            }
            , control: {}
        };
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $scope.centerOnMe = function() {
            gmapsScope.centerOnMe();
        };

        $ionicModal.fromTemplateUrl('client/templates/map02.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });



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

    .controller('MapCtrlServ', function ($scope, $log, $timeout, uiGmapGoogleMapApi) {
    $scope.map = {center: {latitude: 55.711333, longitude: 37.383128 }, zoom: 15 };
    $scope.map = {center: {latitude: 55.711333, longitude: 37.383128 }, zoom: 15 };
    $scope.options = {zoomControl: false,
        draggable: false,
        rotateControl: false,
        scrollwheel: false,
        streetViewControl: false,
        disableDefaultUI: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.animation="Animation.BOUNCE";
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 55.711333,
            longitude: 37.383128
        },
        options: {
            zoomControl: false,
            draggable: false,
            rotateControl: false,
            scrollwheel: false,
            streetViewControl: false,
            disableDefaultUI: false },

        events: {
            dragend: function (marker, eventName, args) {
                $log.log('marker dragend');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };
    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
        if (_.isEqual(newVal, oldVal))
            return;
        $scope.coordsUpdates++;
    });
    $timeout(function () {
        $scope.marker.coords = {
            latitude: 55.711333,
            longitude: 37.383128
        };
        $scope.dynamicMoveCtr++;
        $timeout(function () {
            $scope.marker.coords = {
                latitude: 55.711333,
                longitude: 37.383128
            };
            $scope.dynamicMoveCtr++;
        }, 2000);
    }, 1000);
});