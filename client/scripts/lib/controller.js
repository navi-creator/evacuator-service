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

    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
        function initialize() {
            var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
            var infoWindow = new google.maps.InfoWindow({map: map});

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    map.setCenter(pos);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }


            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Uluru (Ayers Rock)'
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

            $scope.map = map;
        }
        google.maps.event.addDomListener(window, 'load', initialize);

        $scope.centerOnMe = function() {
            if(!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function(error) {
                alert('Unable to get location: ' + error.message);
            });
        };

    });