package com.serofit.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.UProfileVO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
		{"file:src/main/webapp/WEB-INF/spring/root-context.xml","file:src/main/webapp/WEB-INF/spring/security-context.xml"})
public class SignUpTests {
	@Autowired
	PasswordEncoder pwEncodertest;
	
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	UProfileMapper upmapper;
	
	@Test
	public void insertUsertest() {		
		for(int i = 0; i < 100; i++) {
			UProfileVO upvo = new UProfileVO();
			
			UserVO uvo = new UserVO();
			
			uvo.setEmail("test@test.com" + i);
			uvo.setId("test" + i);
			uvo.setNickname("tenic" + i);
			uvo.setPw(pwEncodertest.encode("QWEqwe123"));
			uMapper.insertUser(uvo);
			uMapper.insertAuth(uvo.getUno());
			
			// uuid 고정 값 변경!!!!!!!!!!!!!!!
			upvo.setUuid("UUID-TEST");
			upvo.setUno(uvo.getUno());
			upmapper.insertProfile(upvo); 			
		}		
	}	
}
