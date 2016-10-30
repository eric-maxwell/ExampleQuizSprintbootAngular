package io.github.ermaxw.quiz.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

/**
 * Created by eric.maxwell on 10/29/16.
 */
public class Choice {
    @JsonProperty
    private String text;
    @JsonProperty
    private boolean isCorrect;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
