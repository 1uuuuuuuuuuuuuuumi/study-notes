package com.lumi.study05.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Study05DTO {
    private String productType;
    private String productName;
    private Integer price;
}
