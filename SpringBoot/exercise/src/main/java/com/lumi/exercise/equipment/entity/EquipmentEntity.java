package com.lumi.exercise.equipment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "equipments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipment_id")
    private Long equipmentId;

    @Column(name = "equipment_type", nullable = false)
    private String equipmentType;

    @Column(name = "equipment_name", nullable = false, unique = true)
    private String equipmentName;

    @Column(name = "equipment_stat", nullable = false)
    private Integer equipmentStat;
}
