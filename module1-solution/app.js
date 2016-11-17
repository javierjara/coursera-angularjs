(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  $scope.name = "";


  $scope.Message = function () {
    if($scope.numberLunch!=0  && $scope.numberLunch<=3 ){
      return "Enjoy!";
    }
    else if($scope.numberLunch>3) {
      return "Too much!";
    }
    else if ($scope.numberLunch==0) {
      return "Please enter data first!";
    }
    return ""
  };

  $scope.checkLunch = function () {
      $scope.numberLunch = 0;
      var arrayOfStrings = $scope.name.split(',');
      if(arrayOfStrings.length==1 && arrayOfStrings[0]==''){
          $scope.numberLunch = 0;
      }
      else {
        $scope.numberLunch = arrayOfStrings.length;
      }

      console.log(arrayOfStrings.length);
  };
}

})();
