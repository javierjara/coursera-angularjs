(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tbc = this;

  tbc.itemsToBuy =  ShoppingListCheckOffService.getItemsToBuy();

  tbc.updateItemToBuy = function (itemIndex, name, quantity) {
    ShoppingListCheckOffService.addItemBought(name, quantity);
    ShoppingListCheckOffService.removeItemToBuy(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var abc = this;
    abc.itemsBought = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService () {
  var service = this;

  var itemsToBuy = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      },
      {
        name: "Yogurt",
        quantity: "100"
      }
  ];

  var itemsBought = [];

  service.removeItemToBuy = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.addItemBought = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsBought.push(item);
  };

  service.getItemsToBuy = function () {
        return itemsToBuy;
  };

  service.getItemsBought = function () {
        return itemsBought;
  };


}

})();
