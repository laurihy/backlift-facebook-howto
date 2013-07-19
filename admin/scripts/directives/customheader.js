databrowser.directive('customheader', function factory(){
    var definitionObject = {
        scope: '=',
        restrict: 'E',
        templateUrl: '/partials/header.html'
    }
    return definitionObject
})