var questionFactory = function($http, $q){
    var questions = [];
    var currentQuestion = {};
    var answers = [];

    var getCurrentQuestion = function(){
        return currentQuestion;
    };

    var setCurrentQuestion = function(question){
        currentQuestion = question;
    };

    var getQuestions = function(){
       return $http({
            method: 'GET',
            url: '/admin/questions'
        });
    };
    var addQuestion = function(question){
        currentQuestion = question;
    };
    var addChoice = function(choice){
        currentQuestion.choices.push(choice);
        angular.forEach(currentQuestion.choices, function(choice, index){
            choice.index = index;
        });
    };
    var saveQuestion = function(){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/admin/questions',
            headers: {
                'Content-Type': 'application/json'
            },
            data: currentQuestion
        }).then(function successCallback(response) {
            console.log(response);
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject('Save failed');
        });

        return deferred.promise;
    };
    var updateQuestion = function(){
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/admin/questions/' + currentQuestion.id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: currentQuestion
        }).then(function successCallback(response) {
            console.log(response);
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject('Save failed');
        });

        return deferred.promise;
    };

    var deleteQuestion = function(id){
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/admin/questions/' + id
        }).then(function successCallback(response) {
            console.log(response);
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject('Save failed');
        });

        return deferred.promise;
    };

    var updateQuestionList = function(action){
        if(action === 'add') {
            return saveQuestion();
        }else{
            return updateQuestion();
        }
    };

    var answerQuestion = function(question, selectedChoice){
        var correct = false;
        angular.forEach(question.choices, function(choice){
            if(choice.isCorrect && choice === selectedChoice) correct = true;
        });
        answers.push({question: question, answer: selectedChoice, isCorrect: correct});
    };
    var clearAnswers = function(){
        answers = [];
    };
    var getGrade = function(quizQuestions){
        var numberOfQuestions = quizQuestions.length;
        var numberOfCorrect = 0;
        angular.forEach(answers, function(answer){
           if(answer.isCorrect) numberOfCorrect++;
        });
        var percent = ((numberOfCorrect/numberOfQuestions) * 100).toFixed(2) + '%'
        return {grade: percent , answers: answers};
    };

    return {
        addQuestion: addQuestion,
        addChoice: addChoice,
        updateQuestionList: updateQuestionList,
        getQuestions: getQuestions,
        getCurrentQuestion: getCurrentQuestion,
        setCurrentQuestion: setCurrentQuestion,
        deleteQuestion: deleteQuestion,
        answerQuestion: answerQuestion,
        getGrade: getGrade,
        clearAnswers: clearAnswers

    }
}
app.factory('questionFactory', questionFactory);
