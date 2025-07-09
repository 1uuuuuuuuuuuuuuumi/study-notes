package com.lumi.exercise.equipment.service;

import com.lumi.exercise.equipment.dto.EquipmentDTO;

import java.util.List;

public interface EquipmentService {

    public void createEquipment(EquipmentDTO dto);

    List<EquipmentDTO> getEquipments();

    void updateEquipment(EquipmentDTO dto);

    void deleteEquipment(String equipmentName);
}
