package com.evanishyn.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {
    private final String orderTrackingNumber;   //Lombok @Data will generate constructor for final fields

}
