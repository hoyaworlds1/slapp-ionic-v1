// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ionic-color-picker', 'ionic-timepicker', 'angular-svg-round-progress'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
    .service('dataService', function () {
      var stringValue = 12;
      var red;
      var green;
      var blue;

      return {
        setRgb: function(value) {
          rgb = value;
        },
        getRgb: function() {
          return rgb;
        },
        getString: function() {
          return stringValue;
        },
        setString: function(value) {
          stringValue = value;
        }
      }
    })


    .controller('mainCtrl', function($scope, $ionicModal, $timeout) {
        // Timer
        var mytimeout = null; // the current timeoutID
        // actual timer method, counts down every second, stops on zero
        $scope.onTimeout = function() {
            if ($scope.timer === 0) {
                $scope.$broadcast('timer-stopped', 0);
                $timeout.cancel(mytimeout);
                return;
            }
            $scope.timer--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        };
        // functions to control the timer
        // starts the timer
        $scope.startTimer = function() {
            mytimeout = $timeout($scope.onTimeout, 1000);
            $scope.started = true;
        };

        // stops and resets the current timer
        $scope.stopTimer = function(closingModal) {
            if (closingModal != true) {
                $scope.$broadcast('timer-stopped', $scope.timer);
            }
            $scope.timer = $scope.timeForTimer;
            $scope.started = false;
            $scope.paused = false;
            $timeout.cancel(mytimeout);
        };
        // pauses the timer
        $scope.pauseTimer = function() {
            $scope.$broadcast('timer-stopped', $scope.timer);
            $scope.started = false;
            $scope.paused = true;
            $timeout.cancel(mytimeout);
        };

        // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
        $scope.$on('timer-stopped', function(event, remaining) {
            if (remaining === 0) {
                $scope.done = true;
                alert("hello")
            }
        });
        // UI
        // When you press a timer button this function is called
        $scope.selectTimer = function(val) {
            $scope.timeForTimer = val;
            $scope.timer = val
            $scope.started = false;
            $scope.paused = false;
            $scope.done = false;
        };

        // This function helps to display the time in a correct way in the center of the timer
        $scope.humanizeDurationTimer = function(input, units) {
            // units is a string with possible values of y, M, w, d, h, m, s, ms
            if (input == 0) {
                return 0;
            } else {
                var duration = moment().startOf('day').add(input, units);
                var format = "";
                if (duration.hour() > 0) {
                    format += "H[h] ";
                }
                if (duration.minute() > 0) {
                    format += "m[m] ";
                }
                if (duration.second() > 0) {
                    format += "s[s] ";
                }
                return duration.format(format);
            }
        };
        // function for the modal
        $ionicModal.fromTemplateUrl('templates/timer.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
});