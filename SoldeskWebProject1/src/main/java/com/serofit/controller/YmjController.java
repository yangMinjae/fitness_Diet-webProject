package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.serofit.service.AiService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/ymj/*")
public class YmjController {
	
	@Autowired
	private AiService aService;
	
	@GetMapping("/apiTest")
	public void showApiTestPage() {
		
	}

	@ResponseBody
	@PostMapping(value = "/send", produces = "text/plain; charset=UTF-8")
	public String send(@RequestBody String prompt) {
		return aService.getResult(prompt);
	}
}
