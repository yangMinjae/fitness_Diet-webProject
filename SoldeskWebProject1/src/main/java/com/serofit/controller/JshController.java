package com.serofit.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.MailVO;
import com.serofit.domain.UserVO;
import com.serofit.service.HFService;
import com.serofit.service.LoginService;
import com.serofit.service.MailService;
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
	
	@Autowired
	MailService mService;
	
	@Autowired
	LoginService lService;
	
	// 메인 화면 로딩시
	@GetMapping("/main")
	public void maimPage(Model model) {
		
		/*
		 * if(uno != 0) { model.addAttribute("nickname", hfService.getNickname(uno)); }
		 */
		
		model.addAttribute("hbList", mpService.getHotPosts(4));
		model.addAttribute("mCount", hfService.selectMailCountByReceiver(1));
	}
	
	// 메일 목록 화면
	@GetMapping("/mail")
	public void mailPage(Model model, int receiver) {
		model.addAttribute("mList", mService.selectByReceiver(receiver));
	}
	
	// 메일 보내기 화면
	@GetMapping("/sendMail")
	public void sendMailPage(Model model, int thrower) {
		model.addAttribute("sender", thrower);
		model.addAttribute("rmdtoList", mService.getFollowList(thrower));
	}
	
	// 메일 보내기
	@PostMapping("/sendMail")
	public String sendMail(MailVO mvo) {
		mService.insertMail(mvo);		
		return "redirect:/jsh/main";
	}
	
	// 이메일로 아이디 비번 찾기
	@ResponseBody
	@GetMapping(value = "/findID", produces = MediaType.APPLICATION_JSON_VALUE)
	public UserVO findID(String email, Model model) {	
		return lService.findID(email);
	}
}
