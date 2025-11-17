package com.puzzle.springBoot.controller;

import com.puzzle.springBoot.entity.GameRecord;
import com.puzzle.springBoot.service.GameRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GameRecordController {

    private final GameRecordService gameRecordService;

    // 게임 기록 저장
    @PostMapping
    public ResponseEntity<GameRecord> saveRecord(@RequestBody GameRecord gameRecord){
        GameRecord saveRecord = gameRecordService.saveGameRecord(gameRecord);
        return ResponseEntity.ok(saveRecord);
    }

    // 전체 기록 조회
    @GetMapping
    public ResponseEntity<List<GameRecord>> getAllRecords(){
        List<GameRecord> records = gameRecordService.getAllRecords();
        return ResponseEntity.ok(records);
    }

    // 이동 횟수 기준 랭킹
    @GetMapping("/top/moves")
    public ResponseEntity<List<GameRecord>> getTopByMoves(){
        List<GameRecord> records = gameRecordService.getTopByMoves();
        return ResponseEntity.ok(records);
    }

    // 시간 기준 랭킹
    @GetMapping("/top/time")
    public ResponseEntity<List<GameRecord>> getTopByTime(){
        List<GameRecord> records = gameRecordService.getTopByTime();
        return ResponseEntity.ok(records);
    }

    // 플레이어별 기록 조회
    @GetMapping("/player/{playerName}")
    public ResponseEntity<List<GameRecord>> getRecordsByPlayer(@PathVariable String playerName){
        List<GameRecord> records = gameRecordService.getRecordsByPlayer(playerName);
        return ResponseEntity.ok(records);
    }
}

/*
코드 설명

Controller 어노테이션

@RestController :
- `@Controller` + `@ResponseBody`
- 모든 메소드가 JSON 형태로 응답

`@RequestMapping("/api/records")` :
- 기본 URL 경로 설정
- 모든 메소드가 `/api/records`로 시작

`@CrossOrigin(origins = "http://localhost:5173")` :
- CORS 설정
- React 앱(5173 포트)에서 접근 허용

HTTP 메소드 매핑

`@PostMapping` : 데이터 생성
POST /api/records

`@GetMapping` : 데이터 조회
GET /api/records
GET /api/records/top/moves
GET /api/records/top/time
GET /api/records/player/{playerName}
* */