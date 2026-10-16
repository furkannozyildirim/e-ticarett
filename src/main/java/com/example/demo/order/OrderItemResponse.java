package com.example.demo.order;

import java.math.BigDecimal;

public record OrderItemResponse(
		Long productId,
		String productName,
		int quantity,
		BigDecimal unitPrice,
		BigDecimal subtotal
) {
	public static OrderItemResponse from(OrderItem item) {
		return new OrderItemResponse(
				item.getProduct().getId(),
				item.getProduct().getName(),
				item.getQuantity(),
				item.getUnitPrice(),
				item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
		);
	}
}
