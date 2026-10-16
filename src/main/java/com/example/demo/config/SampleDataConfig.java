package com.example.demo.config;

import com.example.demo.product.Product;
import com.example.demo.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class SampleDataConfig {

	@Bean
	CommandLineRunner loadSampleProducts(ProductRepository productRepository) {
		return args -> {
			if (productRepository.count() == 0) {
				productRepository.save(new Product(
						"Kablosuz Kulaklık", "Bluetooth kulaklık, 24 saat pil ömrü",
						new BigDecimal("1299.90"), 25, "Elektronik"));
				productRepository.save(new Product(
					"Minimalist Sırt Çantası", "Günlük kullanıma uygun su geçirmez çanta",
						new BigDecimal("849.50"), 12, "Aksesuar"));
				productRepository.save(new Product(
						"Seramik Kupa", "El yapımı 350 ml seramik kupa",
						new BigDecimal("219.00"), 40, "Ev"));
			}
		};
	}
}
