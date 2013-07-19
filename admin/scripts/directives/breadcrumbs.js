databrowser.directive('breadcrumbs', function($rootScope){
    var definitionObject = {
        scope: '=',
        restrict: 'E',
        templateUrl: '/partials/breadcrumbs.html',
        controller: function($scope, $rootScope){
            //$scope.breadcrumbs = $rootScope.breadcrumbs;
        }
    }
    return definitionObject
})