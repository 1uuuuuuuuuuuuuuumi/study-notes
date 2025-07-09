package com.lumi.exercise.equipment.service;

import com.lumi.exercise.equipment.dto.EquipmentDTO;
import com.lumi.exercise.equipment.entity.EquipmentEntity;
import com.lumi.exercise.equipment.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService{

    private final EquipmentRepository repository;

    @Override
    public void createEquipment(EquipmentDTO dto) {
        // 입력받은 장비데이터를 DB에 저장
        EquipmentEntity entity = EquipmentEntity.builder()
                .equipmentType(dto.getEquipmentType())
                .equipmentName(dto.getEquipmentName())
                .equipmentStat(dto.getEquipmentStat())
                .build();

        repository.save(entity);
    }

    @Override
    public List<EquipmentDTO> getEquipments() {
        return repository.getEquipments();
    }

    @Override
    public void updateEquipment(EquipmentDTO dto) {
        repository.updateEquipmentStat(dto.getEquipmentName(), dto.getEquipmentStat());
    }

    @Override
    public void deleteEquipment(String equipmentName) {
        repository.deleteEquipment(equipmentName);
    }
}
