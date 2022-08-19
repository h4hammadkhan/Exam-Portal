package com.exam.service.impl;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.Repo.QuizRepository;
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

}
