package com.evanishyn.ecommerce.service;

import com.evanishyn.ecommerce.dto.Purchase;
import com.evanishyn.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
