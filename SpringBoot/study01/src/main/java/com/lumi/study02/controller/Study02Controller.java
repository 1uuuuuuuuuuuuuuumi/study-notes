package com.lumi.study02.controller;

import com.lumi.study02.dto.Study02DTO;
import com.lumi.study02.service.Study02Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study02")
public class Study02Controller {

    private final Study02Service study02Service;

    @PostMapping("")
    public ResponseEntity<?> insertData(@RequestBody Study02DTO dto){

        study02Service.insertData(dto);
        return ResponseEntity.ok("데이터 등록 완료");
    }
}
