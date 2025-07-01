package com.lumi.study04.controller;

import com.lumi.study04.Service.Study04Service;
import com.lumi.study04.dto.Study04DTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study04")
public class Study04Controller {

    private final Study04Service service;

    // 아래가 JSON 형태의 데이터임.
    // {
    //  "productType": "전자제품",
    //  "productName": "노트북",
    //  "price": 1500000
    // }

    @PostMapping("")
    public ResponseEntity<?> insertData(@RequestBody Study04DTO dto){  // 1. 클라이언트에서 전송한 데이터를 DTO로 받음
        //기능
        service.insertData(dto);

        return ResponseEntity.ok("데이터 저장 완료");
    }
}
