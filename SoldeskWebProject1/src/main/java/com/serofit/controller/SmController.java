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

import com.serofit.domain.UserVO;
import com.serofit.service.MatePageService;
import com.serofit.service.SignupService;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/sm/*")

public class SmController {

	@Autowired
	private SignupService sService;

	// 회원가입 화면으로 이동
	@GetMapping("/signup")
	public void singup() {
		log.info("singup...");
	}
	
	// 아이디 중복확인
	@GetMapping(value = "/validateId/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
	@ResponseBody
	public String validateId(@PathVariable String id) {
		return (sService.validateId(id) == 0) ? "true" : "false";
	}

	// 이메일 중복확인
	@GetMapping(value = "/validateEmail")
	@ResponseBody
	public String validateEmail(@RequestParam String email) {
		return (sService.validateEmail(email) == 0) ? "true" : "false";
	}

	// 닉네임 중복확인
	@GetMapping(value = "/validateNickname/{nickname}", produces = MediaType.TEXT_PLAIN_VALUE)
	@ResponseBody
	public String validateNickname(@PathVariable String nickname) {
		return (sService.validateNickname(nickname) == 0) ? "true" : "false";
	}

	// 회원가입
	@PostMapping("/insertUser")
	@ResponseBody
	public String insertUser(@RequestBody UserVO uvo) {
		return (sService.insertUser(uvo) == 0) ? "true" : "false";
	}

	// --------------------------------------------------------------------------------

	@Autowired
	private MatePageService mpservice;
	
	// 운동 메이트 찾기 화면으로 이동
	@GetMapping("/matePage")
	public String matePage(Model model) {
		// uno 임시 부여 
		// , int uno 매개변수에 추가하기
		int uno1 = 3;
		model.addAttribute("user", mpservice.selectByUno(uno1));
		model.addAttribute("mateList", mpservice.findMateList(uno1));
		
		return "/sm/matePage";
	}
	
}
