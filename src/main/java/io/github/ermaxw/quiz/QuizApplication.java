package io.github.ermaxw.quiz;

import io.github.ermaxw.quiz.domain.Question;
import io.github.ermaxw.quiz.services.SharedData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

@SpringBootApplication
public class QuizApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizApplication.class, args);
		SharedData.QUESTIONS = new HashMap<>();
		SharedData.QUIZQUESTIONS = new HashMap<>();
	}
}
