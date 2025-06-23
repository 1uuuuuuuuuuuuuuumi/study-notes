package com.lumi.study01.service;

import com.lumi.study01.dto.PracticeDTO;
import com.lumi.study01.entity.PracticeEntity;
import com.lumi.study01.repository.PracticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PracticeServiceImpl implements PracticeService{

    private final PracticeRepository practiceRepository;

    @Override
    public void dataSave(PracticeDTO practiceDTO) {
        // Convert PracticeDTO to PracticeEntity
        PracticeEntity practice = PracticeEntity.builder()
                .name(practiceDTO.getName())
                .email(practiceDTO.getEmail())
                .message(practiceDTO.getMessage())
                .build();


        practiceRepository.save(practice);
    }
}
