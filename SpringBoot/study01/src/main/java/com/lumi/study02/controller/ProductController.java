package com.lumi.study02.controller;

import com.lumi.study02.dto.ProductDTO;
import com.lumi.study02.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study02")
public class ProductController {

    private final ProductService productService;

    @PostMapping("")
    public ResponseEntity<String> createProduct(@RequestBody ProductDTO dto){
        productService.createProduct(dto);
        return ResponseEntity.ok("등록완료");
    }
}
