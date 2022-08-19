package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.Repo.CategoryRepository;
import com.exam.model.exam.Category;
import com.exam.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public Category addCategory(Category category) {
		return this.categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category) {
		return this.categoryRepository.save(category);
	}

	@Override
	public Set<Category> getCategories() {
		return new LinkedHashSet<>(this.categoryRepository.findAll());
	}

	@Override
	public Category getCategory(long categoryId) {
		return this.categoryRepository.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(long catagoryId) {
		Category category = new Category();
		category.setId(catagoryId);
		this.categoryRepository.delete(category);
		
	}

}
