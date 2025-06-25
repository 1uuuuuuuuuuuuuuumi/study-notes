package com.lumi.study02.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Study02DTO {
    private String productType;
    private String productName;
    private Integer price;
}
