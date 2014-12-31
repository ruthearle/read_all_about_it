var app = angular.module('app', []);

app.controller('MainController', function ($scope, $http) {
  $scope.title = "Read All About it";
  $scope.strapline = "News Aggregator for BBC, Sky, and Hacker News";
  $http.get('http://localhost:8080/news')
    .success(function(response) {$scope.items = response});
});
