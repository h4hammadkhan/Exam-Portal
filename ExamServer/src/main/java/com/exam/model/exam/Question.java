package com.exam.model.exam;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long questionId;
	
	@Column(length = 5000)
	private String content;
	
	private String image;
	
	private String option1;
	
	private String option2;
	
	private String option3;
	
	private String option4;
	
	//@JsonIgnore // this will ignore the field sending to the client
		// JsonIgnore ignore both sides get and set 
	private String answer;
	
	@Transient // not included in database
	private String givenAnswer;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Quiz quiz;


	public Question() {
		super();
	}


	public long getQuestionId() {
		return questionId;
	}


	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public String getOption1() {
		return option1;
	}


	public void setOption1(String option1) {
		this.option1 = option1;
	}


	public String getOption2() {
		return option2;
	}


	public void setOption2(String option2) {
		this.option2 = option2;
	}


	public String getOption3() {
		return option3;
	}


	public void setOption3(String option3) {
		this.option3 = option3;
	}


	public String getOption4() {
		return option4;
	}


	public void setOption4(String option4) {
		this.option4 = option4;
	}


	//@JsonIgnore // ignore while getting answer
		// NORMAL user won't able to see answer that's good but...
		//this will create a problem, ADMIN won't able to see answer  
	public String getAnswer() {
		return answer;
	}


	//@JsonProperty("answer") // do not ignore while setting the answer
	public void setAnswer(String answer) {
		this.answer = answer;
	}


	public Quiz getQuiz() {
		return quiz;
	}


	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}


	public String getGivenAnswer() {
		return givenAnswer;
	}


	public void setGivenAnswer(String givenAnswer) {
		this.givenAnswer = givenAnswer;
	}
	
	
	
	
	
	
}
