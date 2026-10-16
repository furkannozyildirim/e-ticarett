package com.example.demo.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
		Long id,
		String customerName,
		String customerEmail,
		LocalDateTime createdAt,
		String status,
		BigDecimal totalAmount,
		List<OrderItemResponse> items
) {
	public static OrderResponse from(CustomerOrder order) {
		return new OrderResponse(
				order.getId(),
				order.getCustomerName(),
				order.getCustomerEmail(),
				order.getCreatedAt(),
				order.getStatus(),
				order.getTotalAmount(),
				order.getItems().stream().map(OrderItemResponse::from).toList()
		);
	}
}
