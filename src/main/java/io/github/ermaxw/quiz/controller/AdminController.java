package io.github.ermaxw.quiz.controller;


import io.github.ermaxw.quiz.domain.Question;
import io.github.ermaxw.quiz.services.SharedData;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "/admin")
public class AdminController {

    @RequestMapping(path = "/questions", method = RequestMethod.GET)
    public List<Question> getQuestions(){
        return new ArrayList<>(SharedData.QUESTIONS.values());
    }

    @RequestMapping(path = "/questions", method = RequestMethod.POST)
    public List<Question> saveQuestion(@RequestBody Question question){
        question.setId(UUID.randomUUID());
        SharedData.QUESTIONS.put(question.getId(), question);
        return new ArrayList<>(SharedData.QUESTIONS.values());
    }

    @RequestMapping(path = "/questions/{id}", method = RequestMethod.PUT)
    public List<Question> updateQuestion(@PathVariable("id") UUID id, @RequestBody Question question){
        SharedData.QUESTIONS.put(id, question);
        return new ArrayList<>(SharedData.QUESTIONS.values());
    }
    @RequestMapping(path = "/questions/{id}", method = RequestMethod.DELETE)
    public List<Question> deleteQuestions(@PathVariable("id") UUID id){
        SharedData.QUESTIONS.remove(id);
        return new ArrayList<>(SharedData.QUESTIONS.values());
    }

}
