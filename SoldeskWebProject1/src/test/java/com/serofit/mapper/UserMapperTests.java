package com.serofit.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.UserVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class UserMapperTests {
	@Autowired
	private UserMapper umapper;
	
	
	public void testRegisterUser() {
		UserVO uvo = new UserVO();
		
		uvo.setEmail("email");
		uvo.setId("id");
		uvo.setNickname("nickName");
		uvo.setPw("pw");
		
		umapper.insertUser(uvo);
	}
		
	public void testreadNickname() {
		int uno = 1;
		
		log.info(umapper.readNickname(uno));		
	}
	
	public void testvalidateEmail() {
		String email = "email1";
		log.info(umapper.validateEmail(email));
	}
	
	public void testlogin() {
		UserVO uvo = new UserVO();
		uvo.setId("id");
		uvo.setPw("pw");
		log.info(umapper.login(uvo));
	}
	
	public void testfindIdPwByEmail() {
		log.info(umapper.findIdPwByEmail("email"));
	}
	
	public void testdeleteUser() {
		log.info(umapper.deleteUser(25));
	}
}
