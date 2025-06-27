package com.lumi.study03.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Study03DTO {
    private  String productType;
    private  String productName;
    private Integer price;
}
