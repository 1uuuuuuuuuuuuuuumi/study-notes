package com.lumi.exercise.monster.repository;

import com.lumi.exercise.monster.dto.AttackDTO;
import com.lumi.exercise.monster.dto.MonsterDTO;
import com.lumi.exercise.monster.entity.MonsterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MonsterRepository extends JpaRepository<MonsterEntity, Long> {

    @Modifying
    @Transactional
    @Query
            (value = """
            UPDATE monsters SET hp = hp - :damage
            WHERE monster_name = :monsterName
            """, nativeQuery = true)
    void decreaseMonsterHp(@Param("monsterName") String monsterName, @Param("damage") Integer damage);

    @Modifying
    @Transactional
    @Query
            (value = """
                    UPDATE monsters SET hp = hp + :heal
                    WHERE monster_name = :monsterName
                    """, nativeQuery = true)
    void recoverMonsterHp(@Param("monsterName") String monsterName, @Param("heal") Integer heal);

    @Query
            (value = """
            SELECT monster_name, monster_level, hp FROM monsters
            """, nativeQuery = true)
    List<MonsterDTO> getMonsters();
}
