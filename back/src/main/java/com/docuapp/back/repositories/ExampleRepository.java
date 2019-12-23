package com.docuapp.back.repositories;

import com.docuapp.back.entities.Example;
import org.springframework.data.repository.CrudRepository;


public interface ExampleRepository extends CrudRepository<Example, Long> {
    void delete(Example example);

}