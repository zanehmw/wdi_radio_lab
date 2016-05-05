"use strict";

(function(){
  angular
  .module("wdiradio", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("RadioIndexController", RadioIndexControllerFunc)
  .controller("RadioShowController", RadioShowControllerFunc)
  .factory("RadioFactory", RadioFactoryFunc)

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("radioIndex", {
      url: "/songs",
      templateUrl: "js/index.html",
      controller: "RadioIndexController",
      controllerAs: "indexVm"
    })
    .state("radioShow", {
      url: "/songs/:id",
      templateUrl: "js/show.html",
      controller: "RadioShowController",
      controllerAs: "showVm"
    })
  }

  RadioFactoryFunc.$inject = ["$resource"];
  function RadioFactoryFunc($resource) {
    return $resource("http://localhost:3000/songs/:id")
  }

  RadioIndexControllerFunc.$inject = ["RadioFactory"];
  function RadioIndexControllerFunc(RadioFactory) {
    var indexVm = this;
    indexVm.songs = RadioFactory.query();
  }

  RadioShowControllerFunc.$inject = [ "RadioFactory", "$stateParams"];
  function RadioShowControllerFunc(RadioFactory, $stateParams) {
    var showVm = this;
    showVm.song = RadioFactory.get({id: $stateParams.id});
  }
})();
