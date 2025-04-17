package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.serofit.service.HFService;
import com.serofit.service.MainPageService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/jsh/*")
public class JshController {
	@Autowired
	HFService hfService;
	
	@Autowired
	MainPageService mpService;
	
	// 메인 화면 로딩시
	@GetMapping("/main")
	public void getNickname(Model model, int uno, int quantity) {
		if(uno != 0) {
			model.addAttribute("nickname", hfService.getNickname(uno));
		}
		
		model.addAttribute("hbList", mpService.getHotPosts(quantity));
	}
}
