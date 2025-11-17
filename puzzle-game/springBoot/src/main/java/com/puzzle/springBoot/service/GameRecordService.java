package com.puzzle.springBoot.service;

import com.puzzle.springBoot.entity.GameRecord;
import com.puzzle.springBoot.repository.GameRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameRecordService {

    private final GameRecordRepository gameRecordRepository;

    // 게임 기록 저장
    @Transactional
    public GameRecord saveGameRecord (GameRecord gameRecord){
        return gameRecordRepository.save(gameRecord);
    }

    // 전체 기록 조회
    public List<GameRecord> getAllRecords(){
        return gameRecordRepository.findAll();
    }

    // 이동 횟수 기준 랭킹 (상위 10개)
    public List<GameRecord> getTopByMoves(){
        return gameRecordRepository.findTop10ByOrderByMovesAsc();
    }

    // 시간 기준 랭킹 (상위 10개)
    public List<GameRecord> getTopByTime(){
        return gameRecordRepository.findTop10ByOrderByTimeSecondsAsc();
    }

    // 플레이어별 기록 조회
    public List<GameRecord> getRecordsByPlayer(String playerName){
        return gameRecordRepository.findByPlayerName(playerName);
    }
}
