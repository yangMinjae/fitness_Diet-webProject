package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.serofit.domain.MailVO;
import com.serofit.service.MailService;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/mail/")
public class MailController {
	
	@Autowired
	MailService mService;
	
	// 메일 보내기 화면
	@GetMapping("/sendMail")
	public void sendMailPage(Model model) {
		int thrower = 1;
		model.addAttribute("sender", thrower);
		model.addAttribute("rmdtoList", mService.getFollowList(thrower));
	}
	
	// 메일 보내기
	@PostMapping("/sendMail")
	public String sendMail(MailVO mvo) {
		mService.insertMail(mvo);		
		return "redirect:/mail";
	}
}
