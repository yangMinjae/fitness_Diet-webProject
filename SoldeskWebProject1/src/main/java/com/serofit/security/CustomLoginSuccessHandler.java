package com.serofit.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {
	
	private final RequestCache requestCache = new HttpSessionRequestCache();
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		 	log.warn("Login Success");

	        // 사용자가 로그인 전에 접근했던 URL 가져오기
	        SavedRequest savedRequest = requestCache.getRequest(request, response);

	        if (savedRequest != null) {
	            String redirectUrl = savedRequest.getRedirectUrl();
	            log.warn("Redirecting to saved request URL: " + redirectUrl);
	            response.sendRedirect(redirectUrl);
	        } else {
	            log.warn("Redirecting to default URL: /");
	            response.sendRedirect("/");
	        }
	}
}
