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
	
}
