package com.lumi.study02.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "product_name", nullable = false, unique = true)
    private String name;

    @Column(name = "price", nullable = false)
    private Integer price;
}
