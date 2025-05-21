package com.serofit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.serofit.domain.UProfileVO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.MailMapper;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;
import com.serofit.security.domain.CustomUser;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class CustomUserDetailService implements UserDetailsService {
	
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	MailMapper mMapper;
	
	@Autowired
	UProfileMapper upMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserVO uvo = uMapper.read(username);
		int mailCount = mMapper.selectMailCountByReceiver(uvo.getUno());
		int mateChecker = upMapper.selectByUno(uvo.getUno()).getMate();
		return uvo == null ? null : new CustomUser(uvo, mailCount, mateChecker);
	}
}
