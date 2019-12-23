package com.docuapp.back.controllers;

import com.docuapp.back.entities.*;
import com.docuapp.back.repositories.ArticleRepository;
import com.docuapp.back.repositories.Category1Repository;
import com.docuapp.back.repositories.Category2Repository;
import com.docuapp.back.repositories.ExampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.StringBufferInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class ArticleController {


    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    Category1Repository category1Repository;

    @Autowired
    Category2Repository category2Repository;

    @Autowired
    ExampleRepository exampleRepository;

    // create or update article
    @PostMapping("/article")
    public ResponseEntity createOrUpdateArticle(@RequestBody Article article) {

        String modus;
        Article articleNew;

        // check if update or create --> if update, use article from db, if create, create new instance
        if(article.getId() != null) {
            Optional<Article> articleOptional = articleRepository.findById(article.getId());
            if(!articleOptional.isPresent()) {
                return new ResponseEntity(new ApiResponse("Article not found", "anf"), HttpStatus.NOT_FOUND);
            }
            articleNew = articleOptional.get();
            modus = "updated";
        } else {
            articleNew = new Article();
            modus = "saved";
        }

        // check if there is already a article with this name and a link to category2
        Article articleRequest = articleRepository.findByTitleAndCategory2Id(article.getTitle(), article.getCategory2_id());
        if(articleRequest != null && articleRequest.getCategory2().getId() != article.getCategory2_id()) {
            return new ResponseEntity(new ApiResponse("Combination of article name and category2 already exists", "cat1cat2duplicate"), HttpStatus.BAD_REQUEST);
        }

        // check if category2 exists
        Optional<Category2> category2 = category2Repository.findById(article.getCategory2_id());
        if (!category2.isPresent()) {
            return new ResponseEntity(new ApiResponse("Category2 not found", "c2nf"), HttpStatus.NOT_FOUND);
        }

        // add category2 id and name
        articleNew.setCategory2(category2.get());

        // add title
        articleNew.setTitle(article.getTitle());

        // get new examples
        List<Example> examples = article.getExample();
        for(Example example : examples) {
            example.setArticle(article);
        }

        // remove old examples
        List<Example> oldExamples = articleNew.getExample();
        if(oldExamples != null) {
            for(Example example : oldExamples) {
                System.out.println("article example --- ");
                example.setArticle(null);
                exampleRepository.delete(example);
            }
        }


        // set new examples
        articleNew.setExample(examples);

        // save article (or update)
        articleRepository.save(articleNew);
        return new ResponseEntity(new ApiResponse("Article " + modus), HttpStatus.OK);
    }


    // get all articles
    @GetMapping("/articles")
    public ResponseEntity getAllArticles() {
        List<Article> articleList = articleRepository.findAll();
        for(Article article : articleList) {
            article.setCategory1_name(article.getCategory2().getCategory1().getName());
            article.setCategory2_name(article.getCategory2().getName());
            article.setExample(new ArrayList<>());
        }
        return new ResponseEntity(articleList, HttpStatus.OK);
    }

    // get one article
    @GetMapping("/article/{id}")
    public ResponseEntity getArticle(@PathVariable Long id) {
        Optional<Article> articleOptional = articleRepository.findById(id);
        if(articleOptional.isPresent()) {
            Article article = articleOptional.get();
            article.setCategory1_name(article.getCategory2().getCategory1().getName());
            article.setCategory2_name(article.getCategory2().getName());
            article.setCategory1_id(article.getCategory2().getCategory1().getId());
            article.setCategory2_id(article.getCategory2().getId());
            return new ResponseEntity(article, HttpStatus.OK);
        }
        return new ResponseEntity(new ApiResponse("Article not found", "anf"), HttpStatus.NOT_FOUND);
    }

    // delete one article
    @DeleteMapping("/article/{id}")
    public ResponseEntity deleteArticle(@PathVariable Long id) {
        Optional<Article> article = articleRepository.findById(id);
        if(article.isPresent()) {
            articleRepository.delete(article.get());
            return new ResponseEntity(new ApiResponse("Article deleted"), HttpStatus.OK);
        }
        return  new ResponseEntity(new ApiResponse("Article not found", "anf"), HttpStatus.NOT_FOUND);
    }


}
