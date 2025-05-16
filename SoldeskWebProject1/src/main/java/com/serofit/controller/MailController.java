package com.serofit.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
		mService.insertMail(mvo);
		return "redirect:/mailList";
	}
	
	// 모달에서 쪽지 보내기
	@PostMapping("/sendMsg")
	@ResponseBody
	public String sendMsg(int myUno, int selectUno, String content) {
		MailVO mvo = new MailVO();
		
		mvo.setReceiver(selectUno);
		mvo.setSender(myUno);
		mvo.setContent(content);
		
		return mService.insertMail(mvo) == 1 ? "true" : "false";
	}
	
	// 메일 확인 시 update
	@GetMapping(value = "/updateByReadMail", produces = "application/json")
	@ResponseBody
	public Map<String, Object> updateByReadMail(int mno, Authentication authentication) {
		CustomUser user = (CustomUser) authentication.getPrincipal();
		
	    mService.updateByReadMail(mno); // 읽음 처리
	    int newCount = mService.selectMailCountByReceiver(user.getUno()); // 안 읽은 메일 수

	    user.setMailCount(newCount); // 사용자 세션도 업데이트 (헤더에 반영될 수 있도록)

	    Map<String, Object> result = new HashMap<>();
	    result.put("mailCount", newCount);
	    result.put("status", "success");
	    
		return result;
	}
}
