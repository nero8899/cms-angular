angular.module('APP').controller('NewProjectCtrl', function ($scope,
                                                             projectService,
                                                             $state) {

    $scope.isCreating = false;


    $scope.onCreateClick = function () {

        $scope.isCreating = true;

        $scope.project.author = $scope.project.author.name;

        projectService.create($scope.project)
            .then(function (res) {

                $scope.isCreating = false;
                $state.go('projects');

            });

    };

});
