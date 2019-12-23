package com.docuapp.back.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Example {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Type(type="text")
    private String text;

    @Type(type="text")
    private String code;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="article_id")
    private Article article;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    @Override
    public String toString() {
        return "Example{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", code='" + code + '\'' +
                ", article=" + article +
                '}';
    }
}
