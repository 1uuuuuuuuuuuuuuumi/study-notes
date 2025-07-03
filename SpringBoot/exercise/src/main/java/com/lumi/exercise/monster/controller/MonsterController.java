package com.lumi.exercise.monster.controller;

import com.lumi.exercise.monster.dto.AttackDTO;
import com.lumi.exercise.monster.dto.MonsterDTO;
import com.lumi.exercise.monster.dto.RecoverDTO;
import com.lumi.exercise.monster.service.MonsterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/monsters")
public class MonsterController {

    private final MonsterService service;

    @PostMapping("")
    public ResponseEntity<?> createMonster(@RequestBody MonsterDTO dto) {
        //기능(service에서 구현)
        service.createMonster(dto);

        return ResponseEntity.ok("몬스터가 생성되었습니다.");
    }

    @GetMapping("")
    public ResponseEntity<?> getMonsters() {
        //기능(service에서 구현)
        return ResponseEntity.ok(service.getMonsters());
    }

    @PutMapping("/attack")
    public ResponseEntity<?> updateMonster(@RequestBody AttackDTO dto) {
        // 기능(service에서 구현)
        service.attackMonster(dto);
        return ResponseEntity.ok("몬스터 hp 감소");
    }

    @PutMapping("/recover")
    public ResponseEntity<?> recoverMonster(@RequestBody RecoverDTO dto){
        // 기능(service에서 구현)
        service.recoverMonster(dto);
        return ResponseEntity.ok("몬스터 hp 회복");
    }
}
