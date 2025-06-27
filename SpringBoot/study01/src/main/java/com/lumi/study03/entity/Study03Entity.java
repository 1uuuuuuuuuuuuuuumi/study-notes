package com.lumi.study03.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "study01")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Study03Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "product_type", nullable = false)
    private String productType;

    @Column(name = "product_name", nullable = false, unique = true)
    private String productName;

    @Column(name = "price", nullable = false)
    private Integer price;
}
