package com.example.demo.product;

import java.math.BigDecimal;

public record ProductResponse(
		Long id,
		String name,
		String description,
		BigDecimal price,
		int stock,
		String category
) {
	public static ProductResponse from(Product product) {
		return new ProductResponse(
				product.getId(),
				product.getName(),
				product.getDescription(),
				product.getPrice(),
				product.getStock(),
				product.getCategory()
		);
	}
}
