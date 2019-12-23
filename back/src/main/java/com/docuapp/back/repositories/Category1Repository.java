package com.docuapp.back.repositories;

import com.docuapp.back.entities.Category1;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface Category1Repository extends CrudRepository<Category1, Long> {
    Category1 findByName(String name);
    Category1 save(Category1 category1);
    List<Category1> findAll();

}