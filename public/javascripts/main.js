'use strict';

angular.module('app', [
  'angulartics',
  'angulartics.google.analytics'
])

.directive('taskCard', function(socket) {
  return {
    restrict: 'A',
    controller: function($scope) {
      socket.on('onCardUpdated', function(data) {
        console.log(data);
        if (data.id === $scope.card.id) {
          $scope.card.name = data.name;
          $scope.card.status = data.status;
        }
      });

      $scope.updateCard = function(card) {
        socket.emit('updateCard', card);
      };
    }
  };
})

.factory('socket', function($rootScope) {
  var socket = io.connect();
  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
})

.controller('cardCtrl', function($scope) {
  $scope.cards = [{
    id: 1,
    name: 'Lazy Loaderの組み込み',
    status: 1,
    member: 'Masaru Furuya',
    memberIcon: ''
  }, {
    id: 2,
    name: 'MongoDBでのセッション管理を実装',
    status: 2,
    member: 'Tomohiro Tanabe',
    memberIcon: ''
  }, {
    id: 3,
    name: 'node.js Express MySQLライブラリの作成',
    status: 1,
    member: 'Shinobu Noguti',
    memberIcon: ''
  }, {
    id: 4,
    name: '大ダイエット',
    status: 1,
    member: 'Masaru Furuya',
    memberIcon: ''
  }];

  // 送信

});
