angular.module('APP', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('APP').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'partial/projects/projects.html',
        controller: 'ProjectsCtrl'
    });
    $stateProvider.state('blog', {
        url: '/blog',
        templateUrl: 'partial/blog/blog.html',
        controller: 'BlogCtrl'
    });
    $stateProvider.state('new-project', {
        url: '/new-project',
        templateUrl: 'partial/new-project/new-project.html',
        controller: 'NewProjectCtrl'
    });
    $stateProvider.state('edit-project', {
        url: '/edit-project',
        templateUrl: 'partial/edit-project/edit-project.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/projects');

});

angular.module('APP').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
