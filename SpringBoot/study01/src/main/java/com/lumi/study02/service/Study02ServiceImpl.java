package com.lumi.study02.service;

import com.lumi.study02.dto.Study02DTO;
import com.lumi.study02.entity.Study02Entity;
import com.lumi.study02.repository.Study02Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Study02ServiceImpl implements Study02Service{

    private final Study02Repository study02Repository;

    @Override
    public void insertData(Study02DTO dto) {
        // 디비저장
        Study02Entity entity = Study02Entity.builder()
                .productType(dto.getProductType())
                .productName(dto.getProductName())
                .price(dto.getPrice())
                .build();

        study02Repository.save(entity);
    }
}
