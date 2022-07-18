package com.exam.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByUserName(String username);
}
