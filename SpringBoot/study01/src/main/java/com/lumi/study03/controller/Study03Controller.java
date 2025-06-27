package com.lumi.study03.controller;

import com.lumi.study03.dto.Study03DTO;
import com.lumi.study03.service.Study03Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/study03")
@RequiredArgsConstructor
public class Study03Controller {

    private final Study03Service study03Service;

    @PostMapping("")
    public ResponseEntity<?> insertData(@RequestBody Study03DTO dto) {

        study03Service.insertData(dto);
        return ResponseEntity.ok("데이터 등록 완료");
    }
}
