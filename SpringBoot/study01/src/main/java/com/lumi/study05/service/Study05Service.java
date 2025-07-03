package com.lumi.study05.service;

import com.lumi.study05.dto.Study05DTO;

import java.util.List;

public interface Study05Service {
    public void insertData(Study05DTO dto);

    public List<Study05DTO> getData();
}
