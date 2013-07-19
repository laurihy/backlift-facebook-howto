function AddnewController($scope, $rootScope, $location, $routeParams, listitems, collectionlist, item, Helpers){
    
    $rootScope.breadcrumbs = [
        {text:$routeParams.collection, url: '/admin/'+$routeParams.collection},
        {text:'Add new', url: '/admin/'+$routeParams.collection+'/addnew'}
    ]

    $scope.collections = collectionlist;
    $scope.collectionKeys = Object.keys($scope.collections)

    $scope.curcollection = $routeParams.collection;

    $scope.item = item;
    
    $scope.keys = Helpers.getSchema(listitems.concat($scope.item))

    $scope.$watch('item', function(o, n){
        $scope.keys = Helpers.getSchema(listitems.concat($scope.item))
    }, true)

    $scope.saveItem = function(){
        $scope.item.$save(function(item, headers){
            $rootScope.addedNew = true;
            $location.path('/admin/'+$routeParams.collection+'/'+item._id);
        });
    }

    $scope.newkey = ''
    $scope.newval = ''

    $scope.addKey = function(){
        // TODO: check that key doesnt already exist. otherwise warn
        $scope.item[$scope.newkey] = $scope.newval
        $scope.newkey = ''
        $scope.newval = ''
    } 
}

AddnewController.resolve = {
    listitems: function($route, $q, Collection, Helpers){
        return Helpers.getListItems($route, $q, Collection)
    },

    item: function($route, $q, Collection){
        col = Collection.bind({collection: $route.current.params.collection});
        return new col();
    },
    collectionlist: function($http, $q, Helpers){
        return Helpers.getCollections($http, $q)
    }
}