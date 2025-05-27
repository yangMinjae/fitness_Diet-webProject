package com.serofit.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import com.serofit.domain.DietVO;
import com.serofit.security.domain.CustomUser;
import com.serofit.service.WriteBoardService;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

	private final RequestCache requestCache = new HttpSessionRequestCache();
	private final WriteBoardService wbService;

	public CustomLoginSuccessHandler(WriteBoardService wbService) {
		this.wbService = wbService;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		SavedRequest savedRequest = requestCache.getRequest(request, response);
		String redirectUrl = (savedRequest != null) ? savedRequest.getRedirectUrl() : null;

		CustomUser customUser = (CustomUser) authentication.getPrincipal();

		if (redirectUrl != null) {
			
			if (redirectUrl.contains("/writeBoard")) {
				List<DietVO> dList = wbService.getDietTitle(customUser.getUno());

				if (dList == null || dList.isEmpty()) {
					log.info("식단이 없어 게시판 작성 대신 /boardList로 리다이렉트");
					response.sendRedirect("/boardList");
					return;
				}
			}

			// 📌 무시해야 할 URL 필터링
			if (redirectUrl.contains("/header/data") ||
			    redirectUrl.contains("/updateMateVisibility?visible") ||
			    redirectUrl.contains("/login")) {
				redirectUrl = "/";
			}

			response.sendRedirect(redirectUrl);
		} else {
			response.sendRedirect("/");
		}
	}
}
