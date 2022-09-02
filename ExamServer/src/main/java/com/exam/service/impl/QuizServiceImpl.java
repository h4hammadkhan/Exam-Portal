package com.exam.service.impl;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.Repo.QuizRepository;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService{

	@Autowired
	private QuizRepository quizRepository;
	
	
	@Override
	public Quiz addQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizzes() {
		return new HashSet<>(this.quizRepository.findAll());
	}

	@Override
	public Quiz getQuiz(long quizId) {
		return this.quizRepository.findById(quizId).get();
	}

	@Override
	public void deleteQuiz(long quizId) {
	
		this.quizRepository.deleteById(quizId);
	}

	@Override
	public List<Quiz> getQuizzesOfCategory(Category category) {
	
		return this.quizRepository.findBycategory(category);
	}
	
	// get active quizzes
	@Override
	public List<Quiz> getActiveQuizzes() {
		return this.quizRepository.findByActive(true);
	}
	
	
	// get active quizzes of the category
	@Override
	public List<Quiz> getActiveQuizzesOfCategory(Category category) {
		return this.quizRepository.findByCategoryAndActive(category, true);
	}

}
