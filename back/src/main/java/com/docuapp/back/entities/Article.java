package com.docuapp.back.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name="article", uniqueConstraints=@UniqueConstraint(columnNames={"category2_id", "title"}))
public class Article {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Transient
    private Long category2_id;

    @Transient
    private Long category1_id;

    @Transient
    private String category2_name;

    @Transient
    private String category1_name;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="category2_id")
    private Category2 category2;

    @OneToMany(mappedBy="article", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Example> example;

    public Article(String title, Category2 category2) {
        this.title = title;
        this.category2 = category2;
    }

    public Article(String title) {
        this.title = title;
    }

    public Article() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Example> getExample() {
        return example;
    }

    public void setExample(List<Example> example) {

        if(this.example == null) {
            this.example = new ArrayList<Example>();
        }

        if (example != null) {
            this.example.clear();
            for(Example tmpExample : example) {
                tmpExample.setArticle(this);
            }
            this.example.addAll(example);
        }

    }

    public Category2 getCategory2() {
        return category2;
    }

    public void setCategory2(Category2 category2) {
        this.category2 = category2;
    }


    @JsonProperty
    public Long getCategory1_id() {
        return category1_id;
    }

    @JsonProperty
    public void setCategory1_id(Long category1_id) {
        this.category1_id = category1_id;
    }

    @JsonProperty
    public Long getCategory2_id() {
        return category2_id;
    }

    @JsonProperty
    public void setCategory2_id(Long category2_id) {
        this.category2_id = category2_id;
    }

    @JsonProperty
    public String getCategory2_name() {
        return category2_name;
    }

    @JsonIgnore
    public void setCategory2_name(String category2_name) {
        this.category2_name = category2_name;
    }

    @JsonProperty
    public String getCategory1_name() {
        return category1_name;
    }

    @JsonIgnore
    public void setCategory1_name(String category1_name) {
        this.category1_name = category1_name;
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
