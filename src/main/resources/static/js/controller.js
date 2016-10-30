app.controller('adminController', ['$location', 'questionFactory', function($location, questionFactory){
    $this = this;
    $this.questions = [];
    $this.question = {choices: []};
    $this.showNext = true;
    questionFactory.getQuestions().then(function(questions){
        $this.questions =  questions.data;
    });
    $this.nav = function ( path ) {
        $location.path( path );
        questionFactory.getQuestions().then(function(questions){
            $this.questions =  questions.data;
        });
    };

    $this.addQuestion = function(){
        questionFactory.addQuestion($this.question);
        $this.nav('/questions/add/choices');
    };
    $this.addChoice = function(){
        questionFactory.addChoice({text: $this.choiceText, isCorrect: $this.choiceIsCorrect});
        $this.question.choices = questionFactory.getCurrentQuestion().choices;
        $this.choiceIsCorrect = false;
        $this.choiceText = '';
    };
    $this.removeChoice = function(index){
        questionFactory.getCurrentQuestion().choices.splice(index, 1);
        $this.question.choices = questionFactory.getCurrentQuestion().choices;
    };
    $this.removeQuestion = function(id){
        questionFactory.deleteQuestion(id).then(function(questions){
           $this.questions = questions.data;
        });
    };
    $this.saveQuestion = function(){
        if(!questionFactory.getCurrentQuestion().id) {
            questionFactory.updateQuestionList('add').then(function () {
                $this.nav('/questions/add');
            });
        }else{
            questionFactory.updateQuestionList('edit').then(function () {
                $this.nav('/questions/add');
            });
        }
    };

    $this.getQuestion = function(){
        return questionFactory.getCurrentQuestion();
    }
    $this.editQuestion = function(question){
        questionFactory.setCurrentQuestion(question);
        $this.question = question;
    };
}]);

app.controller('quizController', ['$location', 'questionFactory', function($location, questionFactory){
    $this = this;
    $this.questions = [];
    $this.question = {choices: []};
    questionFactory.getQuestions().then(function(questions){
        $this.questions =  questions.data;
        $this.grade = questionFactory.getGrade($this.questions);
        angular.forEach($this.questions, function(question, index){
            question.index = index;
        });
        questionFactory.clearAnswers();
        questionFactory.setCurrentQuestion($this.questions[0]);
    });

    $this.next = function(question){
        var selectedChoice = {};
        angular.forEach(question.choices, function(choice){
            if(choice.text === $this.selectedChoiceText){
                selectedChoice = choice;
            }
        });

        questionFactory.answerQuestion(question, selectedChoice);
        $this.showNext = true;
        var currentIndex = questionFactory.getCurrentQuestion().index;
        if(currentIndex < $this.questions.length - 1) {
            $this.question = $this.questions[currentIndex+1];
            questionFactory.setCurrentQuestion($this.question);
        }else{
            $location.path('/report');
        }
    };

    $this.getQuestion = function(){
        return questionFactory.getCurrentQuestion();
    };
}]);