package com.puzzle.springBoot.repository;

import com.puzzle.springBoot.entity.GameRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRecordRepository extends JpaRepository<GameRecord, Long> {

//    이동 횟수 기준 상위 10개 조회 (오름차순)
    List<GameRecord> findTop10ByOrderByMovesAsc();

//    시간 기준 상위 10개 조회 (오름차순)
    List<GameRecord> findTop10ByOrderByTimeSecondsAsc();

//    플레이어 이름으로 검색
    List<GameRecord> findByPlayerName(String playerName);
}
