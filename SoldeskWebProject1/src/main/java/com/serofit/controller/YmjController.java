package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.MypageProfileDTO;
import com.serofit.service.MyPageService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/ymj/*")
public class YmjController {
	@Autowired
	MyPageService mService;
	
	@GetMapping("/myPage")
	public void showMyPage() {
		log.info("....forwarding to myPage....");
	}
	
	@ResponseBody
	@PostMapping(value = "/getProfileInfo", consumes = MediaType.TEXT_PLAIN_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public MypageProfileDTO getProfileInfo(@RequestBody String uno) {
		log.info("!!!!!!!!!!!!!!!!!!!!!uno!!!!!!!!!!!!!!!!!!!!!"+uno);
		uno = 1+"";			// 추후 삭제
		MypageProfileDTO mpDTO = mService.getUserProfileInfo(Integer.parseInt(uno));
		return mpDTO;
	}
}
