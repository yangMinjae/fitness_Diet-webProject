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

		    SavedRequest savedRequest = requestCache.getRequest(request, response);

		    if (savedRequest != null) {
		        String redirectUrl = savedRequest.getRedirectUrl();

		        if (redirectUrl != null) {
		        	if(redirectUrl.contains("/header/data") || redirectUrl.contains("/updateMateVisibility?visible")) {
			            response.sendRedirect("/");
		        	}
		        } else {
		            response.sendRedirect(redirectUrl);
		        }

		    } else {
		        response.sendRedirect("/");
		    }
	}
}
