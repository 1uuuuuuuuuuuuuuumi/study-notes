package com.lumi.exercise.equipment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentDTO {
    private String equipmentType;
    private String equipmentName;
    private Integer equipmentStat;
}
