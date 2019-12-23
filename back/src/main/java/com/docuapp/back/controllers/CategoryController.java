package com.docuapp.back.controllers;

import com.docuapp.back.entities.*;
import com.docuapp.back.repositories.ArticleRepository;
import com.docuapp.back.repositories.Category1Repository;
import com.docuapp.back.repositories.Category2Repository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class CategoryController {

    @Autowired
    private Category1Repository category1Repository;

    @Autowired
    private Category2Repository category2Repository;

    @Autowired
    private ArticleRepository articleRepository;

    // get all categorie1s
    @GetMapping("/categories")
    public ResponseEntity getCategory1s() {
        List<Category1> category1List = category1Repository.findAll();
        return new ResponseEntity(category1List, HttpStatus.OK);

    }

    // create or update category1
    @PostMapping("/category1")
    public ResponseEntity saveCategory1(@RequestBody Category1 category1Request) {

        // check if category with same name already exists
        Category1 category1 = category1Repository.findByName(category1Request.getName());
        if (category1 != null && category1Request.getId() != category1.getId()) {
            return new ResponseEntity(new ApiResponse("Category1 name already exists", "c1duplicate"), HttpStatus.BAD_REQUEST);
        }


        // update category
        Category1 category1New;
        if(category1Request.getId() != null) {
            Optional<Category1> category1Optional = category1Repository.findById(category1Request.getId());
            if(!category1Optional.isPresent()) {
                return new ResponseEntity(new ApiResponse("Category1 not found for id", "c1notfound"), HttpStatus.BAD_REQUEST);
            }
            category1New = category1Optional.get();
            category1New.setName(category1Request.getName());
            category1New.setDescription(category1Request.getDescription());
            category1Repository.save(category1New);
            return new ResponseEntity(new ApiResponse("Category1 updated", null, category1New.getId()), HttpStatus.OK);
        }

        // add new category
        category1Repository.save(category1Request);
        return new ResponseEntity(new ApiResponse("Category1 added", null, category1Request.getId()), HttpStatus.OK);
    }

    // create or update category2
    @PostMapping("/category2")
    public ResponseEntity saveCategory2(@RequestBody Category2 category2) {

        // check if category1 can be found
        Optional<Category1> category1Optional = category1Repository.findById(category2.getCategory1_id());
        if(!category1Optional.isPresent()) {
            return new ResponseEntity(new ApiResponse("Category1 not found", "c1notfound"), HttpStatus.NOT_FOUND);
        }
        Category1 category1 = category1Optional.get();
        Category2 category2New;

        // check if there is already a category2 with this name and a link to category1
        Category2 category2request = category2Repository.findByNameAndCategory1Id(category2.getName(), category1.getId());
        if(category2request != null && category2request.getId() != category2.getId()) {
            return new ResponseEntity(new ApiResponse("Combination of category1 and category2 already exists", "cat1cat2duplicate"), HttpStatus.BAD_REQUEST);
        }

        // update
        if(category2.getId() != null) {
            Optional<Category2> category2Optional = category2Repository.findById(category2.getId());
            if(!category2Optional.isPresent()) {
                return new ResponseEntity(new ApiResponse("Category2 not found", "c2notfound"), HttpStatus.NOT_FOUND);
            }
            category2New = category2Optional.get();
            category2New.setCategory1(category1);
            category2New.setName(category2.getName());
            category2New.setDescription(category2.getDescription());
            category2Repository.save(category2New);
            return new ResponseEntity(new ApiResponse("Category2 updated", null, category2New.getId()), HttpStatus.OK);
        }


        // add new category2
        category2New = new Category2();
        category2New.setName(category2.getName());
        category2New.setDescription(category2.getDescription());
        category2New.setCategory1(category1);
        Category2 cat2 = category2Repository.save(category2New);

        return new ResponseEntity(new ApiResponse("Category2 added",null, cat2.getId()), HttpStatus.OK);
    }

    // delete one category1
    @DeleteMapping("/category1/{id}")
    public ResponseEntity deleteCategory1(@PathVariable Long id) {
        Optional<Category1> category1Optional = category1Repository.findById(id);
        if(!category1Optional.isPresent()) {
            return new ResponseEntity(new ApiResponse("Category1 not found", "c1notfound"), HttpStatus.BAD_REQUEST);
        }
        Category1 category1 = category1Optional.get();

        // check if c1 still has c2s
        List<Category2> category2List = category1.getCategory2();
        if(category2List.size() > 0) {
            return new ResponseEntity(new ApiResponse("Category1 still has category2s. First delete all category2s", "c1stillhasc2"), HttpStatus.BAD_REQUEST);
        }

        category1Repository.delete(category1);
        return new ResponseEntity(new ApiResponse("Category1 deleted"), HttpStatus.OK);
    }

    // delete one category2
    @DeleteMapping("/category2/{id}")
    public ResponseEntity deleteCategory2(@PathVariable Long id) {
        Optional<Category2> category2Optional = category2Repository.findById(id);
        if(!category2Optional.isPresent()) {
            return new ResponseEntity(new ApiResponse("Category2 not found", "c2notfound"), HttpStatus.BAD_REQUEST);
        }
        Category2 category2 = category2Optional.get();

        List<Article> articleList = category2.getArticle();
        if(articleList.size() > 0) {
            return new ResponseEntity(new ApiResponse("Category2 still has articles. First delete all articles for category2", "c2stillhasa"), HttpStatus.BAD_REQUEST);
        }

        category2Repository.delete(category2);
        return new ResponseEntity(new ApiResponse("Category2 deleted"), HttpStatus.OK);
    }


}
