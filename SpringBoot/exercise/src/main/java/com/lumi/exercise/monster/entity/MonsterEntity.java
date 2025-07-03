package com.lumi.exercise.monster.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "monsters")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MonsterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "monster_id")
    private Long monsterId;

    @Column(name = "monster_name", nullable = false, unique = true)
    private String monsterName;

    @Column(name = "monster_level", nullable = false)
    private Integer monsterLevel;

    @Column(name = "hp", nullable = false)
    private Integer hp;
}
