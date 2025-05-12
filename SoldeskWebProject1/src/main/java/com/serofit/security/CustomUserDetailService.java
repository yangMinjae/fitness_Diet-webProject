package com.serofit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.serofit.domain.UserVO;
import com.serofit.mapper.UserMapper;
import com.serofit.security.domain.CustomUser;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class CustomUserDetailService implements UserDetailsService {
	
	@Autowired
	UserMapper uMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.warn("load user by userName : "+username);
		UserVO vo = uMapper.read(username);
		
		log.warn("member mapper : "+vo);
		return vo==null?null:new CustomUser(vo);
	}
}
