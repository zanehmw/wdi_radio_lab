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
      templateUrl: "js/index.html"
      controller: "RadioIndexController"
      controllerAs: "indexVm"
    })
    .state("radioShow", {
      url: "/songs/:id",
      templateUrl: "js/show.html"
      controller: "RadioShowController"
      controllerAs: "showVm"
    })


  }
})();
