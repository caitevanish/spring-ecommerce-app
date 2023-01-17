package com.evanishyn.ecommerce.service;

import com.evanishyn.ecommerce.dao.CustomerRepository;
import com.evanishyn.ecommerce.dto.Purchase;
import com.evanishyn.ecommerce.dto.PurchaseResponse;
import com.evanishyn.ecommerce.entity.Customer;
import com.evanishyn.ecommerce.entity.Order;
import com.evanishyn.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;   //
import org.springframework.stereotype.Service;

//import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;


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
         Set<OrderItem> orderItems = purchase.getOrderItems();
         orderItems.forEach(order::add); //method reference = forEach(item-> order.add(item))

         //populate order with billingAddress and ShippingADdress
         order.setBillingAddress(purchase.getBillingAddress());
         order.setShippingAddress(purchase.getShippingAddress());

         //populate customer with order
          Customer customer = purchase.getCustomer();
          customer.add(order);

         //save to the database
         customerRepository.save(customer);

         //return a response
         return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number (UUID version-4)
        //UUID: Universal unique identifer
        return UUID.randomUUID().toString();
    }
}
