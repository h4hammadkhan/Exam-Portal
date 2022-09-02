package com.exam.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

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

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	// add question
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	// update question
	@PutMapping("/")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	//get number of question of any quiz
	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId){
//		Quiz quiz = new Quiz();
//		quiz.setQuizId(quizId);
//		Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//		return ResponseEntity.ok(questionsOfQuiz);
		Quiz quiz = this.quizService.getQuiz(quizId);
		Set<Question> questions = quiz.getQuestions();
		List<Question> list = new ArrayList(questions);
		if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
		}
		
		list.forEach(q->{
			q.setAnswer("");
		});
		
		
		if(list.size() == 0) {
			return ResponseEntity.ok("data not found !!");
		}
	
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	
	//get all question of any quiz
		@GetMapping("/quiz/all/{quizId}")
		public ResponseEntity<?> getAllQuestionsOfQuiz(@PathVariable("quizId") Long quizId){
			Quiz quiz = new Quiz();
			quiz.setQuizId(quizId);
			Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
			return ResponseEntity.ok(questionsOfQuiz);
		
//			return ResponseEntity.ok(list);
		}
	
	//get all questions
	@GetMapping("/")
	public ResponseEntity<?> getQuestions(){
		return ResponseEntity.ok(this.questionService.getQuestions());
	}
	
	
	//get a question
	@GetMapping("/{questionId}")
	public Question getQuestion(@PathVariable("questionId") Long questionId) {
		return this.questionService.getQuestion(questionId);
	}
	
	
	//delete question
	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable("questionId") Long questionId) {
		this.questionService.deleteQuestion(questionId);
	}
	
	// check quiz
	@PostMapping("/check-quiz")
	public ResponseEntity<?> checkQuiz(@RequestBody List<Question> questions){
		System.out.println(questions);
		double marksGot = 0;
		int correctAnswer = 0;
		int attempted = 0;
		for(Question q: questions){
			System.out.println(q.getGivenAnswer()+":"+q.getAnswer());
			//single question 
			Question question = this.questionService.getOneQuestion(q.getQuestionId());
			if(question.getAnswer().equals(q.getGivenAnswer()) ) 
			{
				// correct
				correctAnswer++;
				double singleQuesMark = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
				marksGot+=singleQuesMark;
			}
			if(q.getGivenAnswer() != null) {
				attempted++;
			}
		};
		
		Map<String, Object> result = Map.of("marksGot",marksGot,"correctAnswer",correctAnswer,"attempted",attempted);
		return ResponseEntity.ok(result);
	}
	
	
}

	