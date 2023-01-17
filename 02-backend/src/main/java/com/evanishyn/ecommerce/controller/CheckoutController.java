package com.evanishyn.ecommerce.controller;

import com.evanishyn.ecommerce.dto.Purchase;
import com.evanishyn.ecommerce.dto.PurchaseResponse;
import com.evanishyn.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeHolder(@RequestBody Purchase purchase){
        //This version deemed "redundant":
//        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
//        return purchaseResponse;

        return checkoutService.placeOrder(purchase);
    }
}
