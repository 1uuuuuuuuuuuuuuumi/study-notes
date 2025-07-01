package com.lumi.study04.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Study04DTO {
    private String productType;
    private String productName;
    private Integer price;
}
