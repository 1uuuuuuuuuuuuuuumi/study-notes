package com.lumi.study05.controller;

import com.lumi.study05.dto.Study05DTO;
import com.lumi.study05.service.Study05Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study05")
public class Study05Controller {

    private final Study05Service service;

    @PostMapping("")
    public ResponseEntity<?> insertData(@RequestBody Study05DTO dto){
        //기능
        service.insertData(dto);

        return ResponseEntity.ok("데이터 저장 완료");
    }

    @GetMapping("")
    public ResponseEntity<?> getData(){
        // 기능 ( service 에서 처리)

        return ResponseEntity.ok(service.getData());
    }
}
