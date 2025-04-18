package com.serofit.controller;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.serofit.service.HFService;
import com.serofit.service.MainPageService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {	
	@Autowired
	MainPageService mpService;
	
	@Autowired
	HFService hfService;
	
	// 서버 구동 시 mainPage
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		model.addAttribute("hbList", mpService.getHotPosts(4)); // 인기 게시글 갯수 4개로 고정
		model.addAttribute("mCount", hfService.selectMailCountByReceiver(1));
		return "/jsh/main";
	}
	
}
