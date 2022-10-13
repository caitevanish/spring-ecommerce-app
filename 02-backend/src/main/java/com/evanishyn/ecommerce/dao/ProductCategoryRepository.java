package com.evanishyn.ecommerce.dao;

import com.evanishyn.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//productCategory=name of JSON Entry
//product-category will be the path

//entity is ProductCategory, the product key is long

//accept calls from web browser scripts from this origin
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
