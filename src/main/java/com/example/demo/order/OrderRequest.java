package com.example.demo.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record OrderRequest(
		@NotBlank String customerName,
		@NotBlank @Email String customerEmail,
		@NotEmpty List<@Valid OrderItemRequest> items
) {
}
