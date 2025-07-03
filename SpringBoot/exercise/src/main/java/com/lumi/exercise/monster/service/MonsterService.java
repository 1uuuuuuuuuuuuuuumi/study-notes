package com.lumi.exercise.monster.service;

import com.lumi.exercise.monster.dto.AttackDTO;
import com.lumi.exercise.monster.dto.MonsterDTO;
import com.lumi.exercise.monster.dto.RecoverDTO;

import java.util.List;

public interface MonsterService {
    public void createMonster(MonsterDTO dto);

    public List<MonsterDTO> getMonsters();

    public void attackMonster(AttackDTO dto);

    public void recoverMonster(RecoverDTO dto);
}
