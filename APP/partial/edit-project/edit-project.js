angular.module('APP').controller('EditProjectCtrl',function(
    $scope,
    projectService,
    $state,
    Upload
){

    $scope.authors = [
        {
            name:'Rok'
        },
        {
            name:'Vesoljec'
        },
        {
            name:'Geek'
        }
    ];



    $scope.project = projectService.model.item;

    $scope.saveClick = function(){

        projectService.update($scope.project._id, $scope.project)
            .then(function(res){

                // do something
                $state.go('projects');

            });

    };

});
