package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.serofit.domain.MailVO;
import com.serofit.security.domain.CustomUser;
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
	public void sendMailPage(Model model, Authentication authentication) {
		if (authentication != null) {
			CustomUser customUser = (CustomUser) authentication.getPrincipal();

			model.addAttribute("sender", customUser.getUno());
			model.addAttribute("rmdtoList", mService.getFollowList(customUser.getUno()));
		}
	}

	// 메일 보내기
	@PostMapping("/sendMail")
	public String sendMail(MailVO mvo) {
		System.out.println(mvo);
		mService.insertMail(mvo);
		return "redirect:/mailList";
	}
}
