(function () {
  /* 9 */
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'src/menu/templates/home.template.html'
    })


    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menu/templates/main-categories.template.html',
      controller: 'CategoriesController as categoriesController',
      resolve:{
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categories.items', {
      url: '/items/{categoryId}',
      templateUrl: 'src/menu/templates/items.template.html',
      controller: "ItemsController as itemsController",
      resolve: {
        items: ['$stateParams','MenuDataService',
          function ($stateParams,MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryId);
          }],
        categoryCode: ['$stateParams', function($stateParams) {
          return $stateParams.categoryId;
        }]
      }
    });
  }
})();
