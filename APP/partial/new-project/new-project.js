angular.module('APP').controller('NewProjectCtrl',function(
    $scope,
    projectService,
    $state,
    Upload,
    $timeout
){

    $scope.isCreating = false;
    $scope.isUploading = false;
    $scope.uploadData = {
        progress:0
    };

    $scope.project = {
        author:'',
        coverImage:null
    };

    $scope.authors = [];

    $scope.uploadFiles = function(file){

        $scope.isUploading = true;

        Upload.upload({
            url:'http://localhost:3010/upload',
            data: { file:file }
        }).then(function (resp) {

            $scope.project.coverImage = resp.data.filename;

            $timeout(function(){

                $scope.isUploading = false;

            },1000);

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.uploadData.progress = progressPercentage;

            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    };

    $scope.onCreateClick = function(){

        $scope.isCreating = true;

        $scope.project.author = $scope.project.author.name;

        projectService.create($scope.project)
            .then(function(res){

                $scope.isCreating = false;
                $state.go('projects');

            });

    };

});
