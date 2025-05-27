package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.FollowVO;
import com.serofit.domain.LoginDTO;
import com.serofit.domain.MailVO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.FollowMapper;
import com.serofit.service.LoginService;
import com.serofit.service.MailService;
import com.serofit.service.MatePageService;
import com.serofit.service.MyPageService;
import com.serofit.service.SignupService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/mate")
public class MateController {
	
	@Autowired
	MatePageService mtpService;
	
	@Autowired
	MyPageService mpService;
	
	@Autowired
	MailService mService;
	
	// 팔로우 취소 시 
	@PostMapping("/unfollow")
	@ResponseBody
	public boolean unfollow(int uno, int userUno) {
		System.out.println("outoutout");
		FollowVO fvo = new FollowVO(userUno, uno, false);
		
		return mpService.unfollow(fvo);
	}
	
	// 팔로우 시
	@PostMapping("/follow")
	@ResponseBody
	public boolean follow(int uno, int userUno) {
		System.out.println("ininin");
		FollowVO fvo = new FollowVO(userUno, uno, false);
		
		return mpService.follow(fvo);
	}
}
