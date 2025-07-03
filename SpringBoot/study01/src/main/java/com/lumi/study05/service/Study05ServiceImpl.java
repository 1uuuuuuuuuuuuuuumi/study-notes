package com.lumi.study05.service;

import com.lumi.study05.dto.Study05DTO;
import com.lumi.study05.entity.Study05Entity;
import com.lumi.study05.repository.Study05Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Study05ServiceImpl implements Study05Service{

    private final Study05Repository repository;

    @Override
    public void insertData(Study05DTO dto) {
        // 디비저장기능 (테이블, 쿼리);
        Study05Entity entity = Study05Entity.builder()
                .productType(dto.getProductType())
                .productName(dto.getProductName())
                .price(dto.getPrice())
                .build();

        repository.save(entity);
    }

    @Override
    public List<Study05DTO> getData() {

        return repository.findAll().stream()
                .map(entity -> Study05DTO.builder()
                        .productType(entity.getProductType())
                        .productName(entity.getProductName())
                        .price(entity.getPrice())
                        .build())
                .toList();
    }
}
