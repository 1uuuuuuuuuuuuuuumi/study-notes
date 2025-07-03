package com.lumi.exercise.monster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonsterDTO {
    private String monsterName;
    private Integer monsterLevel;
    private Integer hp;
}
