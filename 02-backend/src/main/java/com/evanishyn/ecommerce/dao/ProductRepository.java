package com.evanishyn.ecommerce.dao;

import com.evanishyn.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")       //accept calls from web browser scripts from this origin
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Spring executing a query based on the method name!!
    //essentially the same as saying "select * from product where category_id = ?;"
    //http://localhost:8080/api/products/search/findByCategoryId?id=1

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);    //adding findBy query method

    //containing = "LIKE" sql
    //in sql: "select * from Product p where p.name LIKE CONCAT('%', :name,'%)"
    //http://localhost:8080/api/products/search/findByNameContaining?name=Python
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
