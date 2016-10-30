var app = angular.module('app', ['ngRoute','ngResource']);
app.config(function($routeProvider){
    $routeProvider
        .when('/questions/add',{
            templateUrl: '/views/addquestion.html',
            controller: 'adminController',
            controllerAs: 'adminCtrl'
        })
        .when('/questions/add/choices',{
            templateUrl: '/views/addchoices.html',
            controller: 'adminController',
            controllerAs: 'adminCtrl'
        })
        .when('/quiz',{
            templateUrl: '/views/quiz.html',
            controller: 'quizController',
            controllerAs: 'quizCtrl'
        })
        .when('/report',{
            templateUrl: '/views/report.html',
            controller: 'quizController',
            controllerAs: 'quizCtrl'
        })
        .otherwise(
            { redirectTo: '/'}
        );
});

