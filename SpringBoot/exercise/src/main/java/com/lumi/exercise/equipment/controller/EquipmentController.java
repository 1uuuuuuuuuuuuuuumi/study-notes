package com.lumi.exercise.equipment.controller;

import com.lumi.exercise.equipment.dto.EquipmentDTO;
import com.lumi.exercise.equipment.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/equipments")
public class EquipmentController {

    private final EquipmentService service;

    @PostMapping("")
    public ResponseEntity<?> createEquipment(@RequestBody EquipmentDTO dto) {
        // 기능(service에서 구현)
        service.createEquipment(dto);

        return ResponseEntity.ok("장비가 생성되었습니다.");
    }

    @GetMapping("")
    public ResponseEntity<?> getEquipments() {
        // 기능(service에서 구현)

        return ResponseEntity.ok(service.getEquipments());
    }

    
}
