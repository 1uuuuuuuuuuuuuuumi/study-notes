package com.lumi.study04.Service;

import com.lumi.study04.dto.Study04DTO;
import com.lumi.study04.entity.Study04Entity;
import com.lumi.study04.repository.Study04Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Study04ServiceImpl implements Study04Service{

    private final Study04Repository repository;

    @Override
    public void insertData(Study04DTO dto) {
        //쿼리 테이블
        Study04Entity entity = Study04Entity.builder()
                .productType(dto.getProductType())
                .productName(dto.getProductName())
                .price(dto.getPrice())
                .build();

        repository.save(entity);
    }
}
