package com.example.demo.config;

import com.example.demo.product.Product;
import com.example.demo.product.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
@Profile("!test")
public class SampleDataConfig {

	private static final Logger log = LoggerFactory.getLogger(SampleDataConfig.class);

	@Bean
	CommandLineRunner loadDummyJsonProducts(ProductRepository productRepository) {
		return args -> {
			try {
				DummyJsonResponse catalog = RestClient.create()
						.get()
						.uri("https://dummyjson.com/products?limit=0")
						.retrieve()
						.body(DummyJsonResponse.class);

				if (catalog == null || catalog.products() == null) {
					log.error("DummyJSON returned an empty product catalog.");
					return;
				}

				Set<String> existingNames = productRepository.findAll().stream()
						.map(Product::getName)
						.collect(Collectors.toSet());
				List<Product> newProducts = catalog.products().stream()
						.filter(item -> existingNames.add(item.title()))
						.map(item -> new Product(item.title(), item.description(),
								BigDecimal.valueOf(item.price()), item.stock(), item.category()))
						.toList();
				productRepository.saveAll(newProducts);
				log.info("Added {} missing products from DummyJSON.", newProducts.size());
			} catch (RestClientException exception) {
				log.error("Could not load DummyJSON products; existing catalog was kept.", exception);
			}
		};
	}

	private record DummyJsonResponse(List<DummyJsonProduct> products) {
	}

	private record DummyJsonProduct(String title, String description, double price, int stock, String category) {
	}
}
