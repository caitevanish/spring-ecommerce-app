package com.evanishyn.ecommerce.service;

import com.evanishyn.ecommerce.dao.CustomerRepository;
import com.evanishyn.ecommerce.dto.Purchase;
import com.evanishyn.ecommerce.dto.PurchaseResponse;
import com.evanishyn.ecommerce.entity.Order;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class CheckoutServiceImpl implements CheckoutService{

    private final CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

     @Override
     @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order info from dto
         Order order = purchase.getOrder();

         //generate tracking number
         String orderTrackingNumber = generateOrderTrackingNumber();
         order.setOrderTrackingNumber(orderTrackingNumber);

         //populate order with orderItems

         //populate order with billingAddress and ShippingADdress

         //populate customer with order

         //save to the database

         //return a response
         return null;
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number (UUID version-4)
        //UUID: Universal unique identifer
        return null;
    }
}
