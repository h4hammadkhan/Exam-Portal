package com.exam.service;

import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserService {

	// create user
	public User createUsers(User user, Set<UserRole> userRoles) throws Exception;
	
	// get userName
	public User getUser(String username);
	
	// delete user by id
	public void deleteUser(Long userId);
	
	//update user
	public User updateUser(User user) throws Exception;
}
