package com.serofit.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {	
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			org.springframework.security.core.AuthenticationException exception) throws IOException, ServletException {
		
		request.getSession().setAttribute("LOGIN_FAIL_MESSAGE", "아이디 또는 비밀번호가 잘못되었습니다.");
        response.sendRedirect("/login");
		
	}
}
