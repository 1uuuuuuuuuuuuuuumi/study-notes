package com.lumi.exercise.equipment.repository;

import com.lumi.exercise.equipment.dto.EquipmentDTO;
import com.lumi.exercise.equipment.entity.EquipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<EquipmentEntity, Long> {

    @Query
            (value = """
                    SELECT equipment_type, equipment_name, equipment_stat FROM equipments
                    """, nativeQuery = true)
    List<EquipmentDTO> getEquipments();
}
