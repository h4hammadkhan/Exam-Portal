package com.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	private QuizService quizService;
	
	// Add quiz
	@PostMapping("/")
	public ResponseEntity<Quiz> add(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	// update quiz
	@PutMapping("/")
	public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	// get all quizzes
	@GetMapping("/")
	public ResponseEntity<?> getQuizzes(){
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	
	// get a quiz
	@GetMapping("/{quizId}")
	public Quiz getQuiz(@PathVariable("quizId") Long quizId) {
		return this.quizService.getQuiz(quizId);
	}
	
	
	// delete quiz
	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable("quizId") Long quizId) {
		this.quizService.deleteQuiz(quizId);
	}
	
	@GetMapping("category/all/{categoryId}")
	public List<Quiz> getQuizzesOfCategory(@PathVariable("categoryId") Long categoryId){
		
		Category category = new Category();
		category.setId(categoryId);
		return this.quizService.getQuizzesOfCategory(category);
	}
	
	
	//get active quizzes
	@GetMapping("/active-quiz")
	public List<Quiz> getActiveQuizzes(){
		return this.quizService.getActiveQuizzes();
	}
	
	
	//get active quizzes of category
	@GetMapping("/category/active-quiz/{categoryId}")
	public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("categoryId") Long categoryId){
		Category category = new Category();
		category.setId(categoryId);
		return this.quizService.getActiveQuizzesOfCategory(category);
	}
	
	
	
	
	
	
}
