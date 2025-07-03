package com.lumi.exercise.monster.repository;

import com.lumi.exercise.monster.entity.MonsterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonsterRepository extends JpaRepository<MonsterEntity, Long> {

}
