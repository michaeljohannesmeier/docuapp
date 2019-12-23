package com.docuapp.back.repositories;

import com.docuapp.back.entities.Article;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArticleRepository extends CrudRepository<Article, Long> {
    Article findByTitleAndCategory2Id(String title, Long id);
    Article findByTitle(String title);
    Article save(Article article);
    List<Article> findAll();
    void delete(Article article);

}