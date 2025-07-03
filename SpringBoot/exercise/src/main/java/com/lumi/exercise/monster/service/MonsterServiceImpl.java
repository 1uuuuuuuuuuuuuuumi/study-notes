package com.lumi.exercise.monster.service;

import com.lumi.exercise.monster.dto.AttackDTO;
import com.lumi.exercise.monster.dto.MonsterDTO;
import com.lumi.exercise.monster.dto.RecoverDTO;
import com.lumi.exercise.monster.entity.MonsterEntity;
import com.lumi.exercise.monster.repository.MonsterRepository;
import jakarta.transaction.Transactional;
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
        return repository.getMonsters();
    }

    @Override
    public void attackMonster(AttackDTO dto) {
        repository.decreaseMonsterHp(dto.getMonsterName(), dto.getDamage());
    }

    @Override
    public void recoverMonster(RecoverDTO dto) {
        // 몬스터의 hp 회복 (몬스터 hp 데이터 수정)
        repository.recoverMonsterHp(dto.getMonsterName(), dto.getHeal());
    }
}
