package com.lumi.study01.controller;

import com.lumi.study01.dto.PracticeDTO;
import com.lumi.study01.service.PracticeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/study01")
@RequiredArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;

    @PostMapping("")
    public ResponseEntity<String> insertData(@RequestBody PracticeDTO dto) {
        practiceService.dataSave(dto);
        return ResponseEntity.ok("데이터 등록 완료");
    }
}
