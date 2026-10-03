package com.fooddelivery.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {

    final OrderRepository repo;
    final RestaurantClient client;

    OrderController(OrderRepository r, RestaurantClient c) {
        repo = r;
        client = c;
    }

    record Item(@NotNull Long menuItemId, @Min(1) int quantity) {}
    record Create(@NotNull Long restaurantId, @NotEmpty List<Item> items,
                  @NotBlank String deliveryAddress, @NotBlank String paymentMethod) {}

    @PostMapping
    Order create(@Valid @RequestBody Create request,
                 @RequestHeader("X-User-Email") String userEmail) {
        BigDecimal total = BigDecimal.ZERO;

        for (var item : request.items()) {
            var menuItem = client.getItem(item.menuItemId());
            if (menuItem == null || !menuItem.available()) {
                throw new IllegalArgumentException("Menu item is not available");
            }
            total = total.add(menuItem.price().multiply(BigDecimal.valueOf(item.quantity())));
        }

        var order = new Order();
        order.setCustomerEmail(userEmail);
        order.setRestaurantId(request.restaurantId());
        order.setTotalAmount(total);
        order.setDeliveryAddress(request.deliveryAddress());
        order.setPaymentMethod(request.paymentMethod());
        order.setPaymentId("DEMO-" + UUID.randomUUID());
        order.setStatus("PREPARING");
        order.setOrderTime(LocalDateTime.now());

        return repo.save(order);
    }

    @GetMapping
    List<Order> mine(@RequestHeader("X-User-Email") String userEmail) {
        return repo.findByCustomerEmailOrderByOrderTimeDesc(userEmail);
    }
}
