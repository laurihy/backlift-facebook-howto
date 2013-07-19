function EditController($scope, $rootScope, $routeParams, listitems, collectionlist, item, Helpers){
    
    $rootScope.breadcrumbs = [
        {text:$routeParams.collection, url: '/admin/'+$routeParams.collection},
        {text:'Edit item', url: '/admin/'+$routeParams.collection+'/'+$routeParams.id}
    ]

    $scope.collections = collectionlist;
    $scope.collectionKeys = Object.keys($scope.collections)

    $scope.curcollection = $routeParams.collection;

    $scope.item = item;
    $scope.listitems = listitems;

    if($rootScope.addedNew){
        $scope.addedNewItem = true;
        $rootScope.addedNew = undefined;
    }

    $scope.allsaves = []
    
    $scope.$watch('listitems', function(o, n){
        $scope.keys = Helpers.getSchema($scope.listitems.concat($scope.item))
    }, true)

    $scope.$watch('item', function(o, n){
        $scope.keys = Helpers.getSchema($scope.listitems.concat($scope.item))
    }, true)

    $scope.saveItem = function(){
        $scope.item.$update();
        $scope.allsaves.push('saved')
    }

    $scope.newkey = ''
    $scope.newval = ''

    $scope.addKey = function(){
        $scope.item[$scope.newkey] = $scope.newval
        $scope.newkey = ''
        $scope.newval = ''
    }
    
}

EditController.resolve = {
    listitems: function($route, $q, Collection, Helpers){
        return Helpers.getListItems($route, $q, Collection)
    },
    item: function($route, $q, Collection, Helpers){
        return Helpers.ResourceAsPromise($q,
            Collection, 
            {collection: $route.current.params.collection},
            'get',
            {id: $route.current.params.id});
    },
    collectionlist: function($http, $q, Helpers){
        return Helpers.getCollections($http, $q)
    }
}