package com.lumi.exercise.monster.service;

import com.lumi.exercise.monster.dto.MonsterDTO;

import java.util.List;

public interface MonsterService {
    public void createMonster(MonsterDTO dto);

    public List<MonsterDTO> getMonsters();
}
