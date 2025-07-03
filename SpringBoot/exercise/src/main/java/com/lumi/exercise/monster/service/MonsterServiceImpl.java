package com.lumi.exercise.monster.service;

import com.lumi.exercise.monster.dto.MonsterDTO;
import com.lumi.exercise.monster.entity.MonsterEntity;
import com.lumi.exercise.monster.repository.MonsterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonsterServiceImpl implements MonsterService {

    private final MonsterRepository repository;

    @Override
    public void createMonster(MonsterDTO dto) {
        //디비에 저장 (테이블, 쿼리)
        // 몬스터 엔티티로 변환
        MonsterEntity entity = MonsterEntity.builder()
                .monsterName(dto.getMonsterName())
                .monsterLevel(dto.getMonsterLevel())
                .hp(dto.getHp())
                .build();

        // 몬스터 엔티티를 저장
        repository.save(entity);
    }

    @Override
    public List<MonsterDTO> getMonsters() {
        return repository.findAll().stream()
                .map(entity -> MonsterDTO.builder() // 엔터티를 DTO로 변환
                        .monsterName(entity.getMonsterName()) // DTO의 몬스터네임은 엔터티의 몬스터네임컬럼에서 가져온다.
                        .monsterLevel(entity.getMonsterLevel()) // DTO의 몬스터레벨은 엔터티의 몬스터레벨컬럼에서 가져온다.
                        .hp(entity.getHp()) // DTO의 HP는 엔터티의 HP컬럼에서 가져온다.
                        .build())
                .toList();
    }
}
