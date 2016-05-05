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
    .state("songIndex", {
      url: "/songs",
      templateUrl: "js/index.html",
      controller: "RadioIndexController",
      controllerAs: "indexVm"
    })
    .state("songShow", {
      url: "/songs/:id",
      templateUrl: "js/show.html",
      controller: "RadioShowController",
      controllerAs: "showVm"
    })
  }

  RadioFactoryFunc.$inject = ["$resource"];
  function RadioFactoryFunc($resource) {
    return $resource("http://localhost:3000/songs/:id", {}, {
      update: {method: "PUT"}
    })
  }

  RadioIndexControllerFunc.$inject = ["RadioFactory"];
  function RadioIndexControllerFunc(RadioFactory) {
    var indexVm = this;
    indexVm.songs = RadioFactory.query();
    indexVm.newSong = new RadioFactory();

    indexVm.create = function($state) {
      indexVm.newSong.$save().then(function(res) {
        indexVm.songs.push(res)
        indexVm.newSong = new RadioFactory();
      })
    };
  }

  RadioShowControllerFunc.$inject = [ "RadioFactory", "$stateParams"];
  function RadioShowControllerFunc(RadioFactory, $stateParams) {
    var showVm = this;
    showVm.song = RadioFactory.get({id: $stateParams.id});

    showVm.update = function() {
      showVm.song.$update({id: $stateParams.id});
    };
    showVm.delete = function() {
      showVm.song.$delete({id: $stateParams.id});
    }
  };
})();
