package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.exam.Repo.RoleRepository;
import com.exam.Repo.UserRepository;
import com.exam.helper.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository; 
	
	@Autowired
	private RoleRepository roleRepository; 
	
	
	// creating users
	@Override
	public User createUsers(User user, Set<UserRole> userRoles) throws  Exception {
		 
		User local = this.userRepository.findByUserName(user.getUserName());
		if(local!=null) {
			System.out.println("User is already there !!");
			throw new UserFoundException();
		}else {
			
			//user create
			for(UserRole ur:userRoles) 
			{
				roleRepository.save(ur.getRole());
			}
			
			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);
			
		}
		
	
		return local;
	}


	// get user by userName
	@Override
	public User getUser(String username) {
		return this.userRepository.findByUserName(username);
	}


	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
		
	}


	@Override
	public User updateUser(User user) throws Exception {
		
		User local = this.userRepository.findByUserName(user.getUserName());
//		
		if(local!=null && local.getId()!=user.getId()) {
			System.out.println("User is already there !!");
			System.out.println(local.toString());
			throw new UserFoundException(); 
		}else {	
			return this.userRepository.save(user);
		}
	}
	
	

}
