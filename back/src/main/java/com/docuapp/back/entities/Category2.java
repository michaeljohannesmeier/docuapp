package com.docuapp.back.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="category2", uniqueConstraints=@UniqueConstraint(columnNames={"category1_id", "name"}))
public class Category2 {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Access(value=AccessType.PROPERTY)
    private Long id;
    private String name;
    private String description;

    @Transient
    private Long category1_id;

    @OneToMany(mappedBy = "category2", fetch = FetchType.EAGER)
    private List<Article> article;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="category1_id")
    private Category1 category1;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category1 getCategory1() {
        return category1;
    }

    public void setCategory1(Category1 category1) {
        this.category1 = category1;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Article> getArticle() {
        return article;
    }

    public void setArticle(List<Article> article) {
        this.article = article;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    public Long getCategory1_id() {
        return category1_id;
    }

    @JsonProperty
    public void setCategory1_id(Long category1_id) {
        this.category1_id = category1_id;
    }

    @Override
    public String toString() {
        return "Category2{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}