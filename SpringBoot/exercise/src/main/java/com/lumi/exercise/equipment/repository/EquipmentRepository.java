package com.lumi.exercise.equipment.repository;

import com.lumi.exercise.equipment.dto.EquipmentDTO;
import com.lumi.exercise.equipment.entity.EquipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<EquipmentEntity, Long> {

    @Query
            (value = """
                    SELECT equipment_type, equipment_name, equipment_stat FROM equipments
                    """, nativeQuery = true)
    List<EquipmentDTO> getEquipments();

    @Modifying
    @Transactional
    @Query
            (value = """
                    UPDATE equipments SET equipment_stat = :equipmentStat
                    WHERE equipment_name = :equipmentName
                    """, nativeQuery = true)
    int updateEquipmentStat(@Param("equipmentName") String equipmentName, @Param("equipmentStat") Integer equipmentStat);

    @Transactional
    @Modifying
    @Query
            (value = """
                    DELETE FROM equipments
                    WHERE equipment_name = :equipmentName
                    """, nativeQuery = true)
    int deleteEquipment(@Param("equipmentName") String equipmentName);
}
