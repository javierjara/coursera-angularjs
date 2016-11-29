(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('urlRestaurantServices', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', foundItemsDirective);


function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: foundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function foundItemsDirectiveController() {
  var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = '';

  list.narrow = function(searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm)
      .then(function (response) {
        list.found = response;
        list.title = (list.found.length+" item(s) found");
        list.filter = searchTerm;
    })
  };
  list.removeItem = function(itemIndex) {
    list.found.splice(itemIndex, 1);
    list.title = (list.found.length+" item(s) found");
  };

}


MenuSearchService.$inject = ['$http', 'urlRestaurantServices'];
function MenuSearchService($http, urlRestaurantServices) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({method: "GET", url: (urlRestaurantServices + "/menu_items.json")})
    .then(function (response) {
      var allItems = response.data.menu_items;
      var foundItems = [];

      if (searchTerm.length == 0) {
        allItems = [];
      } else {
      var x;
      console.log(allItems);
      for (x in allItems) {
        var str = allItems[x].description;

        if (str.toLowerCase().indexOf(searchTerm) >= 0) {
          foundItems.push(allItems[x]);
        }
      }
      console.log(foundItems);
    }
    return foundItems;
    })
  };
}

})();
