package com.docuapp.back.repositories;

import com.docuapp.back.entities.Category1;
import com.docuapp.back.entities.Category2;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface Category2Repository extends CrudRepository<Category2, Long> {
    Category2 findByNameAndCategory1Id(String name, Long id);
    Category2 findByName(String name);
    Category2 save(Category2 category2);
    List<Category2> findAll();

}