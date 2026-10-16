package com.example.demo.product;

import com.example.demo.shared.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {

	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Transactional(readOnly = true)
	public List<Product> getProducts(String category) {
		if (category == null || category.isBlank()) {
			return productRepository.findAll();
		}
		return productRepository.findByCategoryIgnoreCase(category);
	}

	@Transactional(readOnly = true)
	public Product getProduct(Long id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + id));
	}

	public Product createProduct(ProductRequest request) {
		Product product = new Product(
				request.name(),
				request.description(),
				request.price(),
				request.stock(),
				request.category()
		);
		return productRepository.save(product);
	}

	public Product updateProduct(Long id, ProductRequest request) {
		Product product = getProduct(id);
		product.update(
				request.name(),
				request.description(),
				request.price(),
				request.stock(),
				request.category()
		);
		return productRepository.save(product);
	}

	public void deleteProduct(Long id) {
		Product product = getProduct(id);
		productRepository.delete(product);
	}
}
