angular.module('APP').controller('ProjectsCtrl',function(
    $scope,
    projectService
){

    $scope.projects = projectService.model.list;


    $scope.deleteClick = function(id){

        projectService.delete(id)
            .then(function(){



            });

    };

    $scope.editClick = function(id){



    };

});
