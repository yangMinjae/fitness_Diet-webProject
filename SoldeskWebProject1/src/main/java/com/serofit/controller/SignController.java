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

import com.serofit.domain.LoginDTO;
import com.serofit.domain.UserVO;
import com.serofit.service.LoginService;
import com.serofit.service.SignupService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/sign")
public class SignController {
	
	@Autowired
	LoginService lService;
	
	@Autowired
	SignupService sService;
	
	/*
	 * @ResponseBody
	 * 
	 * @PostMapping(value = "/login", produces = MediaType.TEXT_PLAIN_VALUE) public
	 * String login(@RequestBody LoginDTO ldto) { System.out.println("???");
	 * //String result = lService.login(ldto); return result!="0" ? result : "fail";
	 * }
	 */
	
	// ---------------------------------회원가입-----------------------------------------

	// 회원가입 화면으로 이동
	@GetMapping("/signUp")
	public String singup() {
		log.info("singup...");
		System.out.println("inininin");
		return "/sign/signUp";
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
	@PostMapping(value = "/insertUser", consumes = "application/json", produces = "text/plain; charset=utf-8")
	@ResponseBody
	public String insertUser(@RequestBody UserVO uvo) {
		return (sService.insertUser(uvo) >= 1) ? "true" : "false";
	}
	
	// 이메일로 아이디 비번 찾기
	@ResponseBody
	@GetMapping(value = "/findID", produces = MediaType.APPLICATION_JSON_VALUE)
	public UserVO findID(String email, Model model) {	
		return lService.findID(email);
	}
}
