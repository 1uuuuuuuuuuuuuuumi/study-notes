package com.lumi.study04.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "study01")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Study04Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "product_type")
    private String productType;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "price")
    private Integer price;
}
