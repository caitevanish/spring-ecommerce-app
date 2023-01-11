package com.evanishyn.ecommerce.dto;

import com.evanishyn.ecommerce.entity.Address;
import com.evanishyn.ecommerce.entity.Customer;
import com.evanishyn.ecommerce.entity.Order;
import com.evanishyn.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
