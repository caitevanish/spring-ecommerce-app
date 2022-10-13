package com.evanishyn.ecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

//JPA entity
@Entity
@Table(name="product")
@Data           //Lombok annotation! Provides getters and setters behind scene
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)   //part two: setting up many to one relationship
    private ProductCategory category;

    @Column(name="sku")
    private String sku;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="active")
    private boolean active;

    @Column(name="units_in_stock")
    private int unitsInStock;

    @Column(name="date_created")
    @CreationTimestamp          //hibernate will automatically manage the timestamps
    private Date dateCreated;

    @Column(name="last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

}
