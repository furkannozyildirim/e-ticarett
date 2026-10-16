package com.example.demo.order;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String customerName;
	private String customerEmail;
	private LocalDateTime createdAt;
	private BigDecimal totalAmount;

	@Column(nullable = false)
	private String status;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<OrderItem> items = new ArrayList<>();

	protected CustomerOrder() {
	}

	public CustomerOrder(String customerName, String customerEmail) {
		this.customerName = customerName;
		this.customerEmail = customerEmail;
		this.createdAt = LocalDateTime.now();
		this.status = "RECEIVED";
		this.totalAmount = BigDecimal.ZERO;
	}

	public void addItem(OrderItem item) {
		items.add(item);
		item.setOrder(this);
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Long getId() {
		return id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public String getCustomerEmail() {
		return customerEmail;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public List<OrderItem> getItems() {
		return items;
	}
}
