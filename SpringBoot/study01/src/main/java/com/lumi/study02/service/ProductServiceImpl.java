package com.lumi.study02.service;

import com.lumi.study02.dto.ProductDTO;
import com.lumi.study02.entity.ProductEntity;
import com.lumi.study02.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    @Override
    public void createProduct(ProductDTO productDTO) {
        ProductEntity product = ProductEntity.builder()
                .type(productDTO.getType())
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .build();

        productRepository.save(product);
    }
}
