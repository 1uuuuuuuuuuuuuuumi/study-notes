package com.lumi.study03.service;

import com.lumi.study03.dto.Study03DTO;
import com.lumi.study03.entity.Study03Entity;
import com.lumi.study03.repository.Study03Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Study03ServiceImpl  implements Study03Service{

    private final Study03Repository study03Repository;

    @Override
    public void insertData(Study03DTO dto) {
        // 디티오에대한데이터를 디비에저장
        Study03Entity entity = Study03Entity.builder()
                .productType(dto.getProductType())
                .productName(dto.getProductName())
                .price(dto.getPrice())
                .build();

        study03Repository.save(entity);
    }
}
