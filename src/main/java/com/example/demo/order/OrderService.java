package com.example.demo.order;

import com.example.demo.product.Product;
import com.example.demo.product.ProductRepository;
import com.example.demo.shared.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class OrderService {

	private final CustomerOrderRepository orderRepository;
	private final ProductRepository productRepository;

	public OrderService(CustomerOrderRepository orderRepository, ProductRepository productRepository) {
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
	}

	public OrderResponse createOrder(OrderRequest request) {
		CustomerOrder order = new CustomerOrder(request.customerName(), request.customerEmail());
		BigDecimal total = BigDecimal.ZERO;

		for (OrderItemRequest itemRequest : request.items()) {
			Product product = productRepository.findById(itemRequest.productId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"Ürün bulunamadı: " + itemRequest.productId()));

			if (product.getStock() < itemRequest.quantity()) {
				throw new IllegalArgumentException("Yetersiz stok: " + product.getName());
			}

			order.addItem(new OrderItem(product, itemRequest.quantity(), product.getPrice()));
			total = total.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.quantity())));
			product.decreaseStock(itemRequest.quantity());
		}

		order.setTotalAmount(total);
		return OrderResponse.from(orderRepository.save(order));
	}

	@Transactional(readOnly = true)
	public List<OrderResponse> getOrders() {
		return orderRepository.findAll().stream().map(OrderResponse::from).toList();
	}

	@Transactional(readOnly = true)
	public OrderResponse getOrder(Long id) {
		CustomerOrder order = orderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Sipariş bulunamadı: " + id));
		return OrderResponse.from(order);
	}
}
