package io.github.ermaxw.quiz.services;

import io.github.ermaxw.quiz.domain.Question;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

public class SharedData {
    //public static List<Question> QUESTIONS;
    //public static List<Question> QUIZQUESTIONS;

    public static HashMap<UUID, Question> QUESTIONS;
    public static HashMap<UUID, Question> QUIZQUESTIONS;
}
