package io.github.ermaxw.quiz.services;

import io.github.ermaxw.quiz.domain.Question;

import java.util.HashMap;
import java.util.UUID;

public class SharedData {

    public static HashMap<UUID, Question> QUESTIONS;
    public static HashMap<UUID, Question> QUIZQUESTIONS;
}
