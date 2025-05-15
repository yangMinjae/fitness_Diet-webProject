package com.serofit.controller;


import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import com.serofit.domain.BoardListDTO;
import com.serofit.security.domain.CustomUser;
import com.serofit.service.BoardService;
import com.serofit.service.HFService;
import com.serofit.service.MailService;
import com.serofit.service.MainPageService;
import com.serofit.service.MatePageService;
import com.serofit.service.MyPageService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping(value = "/")
public class MainController {	
	@Autowired
	MainPageService mpService;
	
	@Autowired
	HFService hfService;
	
	@Autowired
	MailService mService;
	
	@Autowired
	BoardService bService;
	
	@Autowired
	MatePageService mtpService;
	
	@Autowired
	MyPageService mypService;
	
	// 서버 구동 시 mainPage
	@GetMapping()
	public String home(Locale locale, Model model) {
		log.info("main!!!!!");
		model.addAttribute("hbList", mpService.getHotPosts(4)); // 인기 게시글 갯수 4개로 고정		 
		
		return "main";
	}
	
	// 로그인 페이지 이동
	@GetMapping("/login")
	public String showLoginPage() {
		log.info("....forwarding to LoginPage....");
		return "/sign/login";
	}
	
	// 마이페이지 이동
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/myPage")
	public String showMyPage() {
		log.info("....forwarding to myPage....");
		
		return "/user/myPage";
	}
	
	// 메일 목록 화면
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/mailList")
	public String mailPage(Model model, Authentication authentication) {		
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		
		model.addAttribute("mList", mService.selectByReceiver(customUser.getUno()));
		return "/mail/mailList";
	}
	
	// 전체게시글 페이지로 이동 (동기)
	@GetMapping("/boardList")
	public String list(Model model) {			
		log.info("boardList....");		
		// 게시글 목록 가져오기
		List<BoardListDTO> list = bService.getPostList(); 
		
		// model에 추가
		model.addAttribute("list", list); 

		return "/board/boardList";
	}
	
	// 운동 메이트 찾기 화면으로 이동
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/matePage")
	public String matePage(Model model, Authentication authentication) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		
		model.addAttribute("user", mtpService.selectByUno(customUser.getUno()));
		model.addAttribute("mateList", mtpService.findMateList(customUser.getUno()));
		
		return "/user/matePage";
	}
	
	// 설문 조사 페이지 이동
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/survey")
	public String serveyPage(Model model) {
		return "/survey/surveyPage";
	}
	
	// 로그아웃 시 메인페이지
	@GetMapping("/customLogout")
	public String logoutGET() {
		log.info("custom Logout");
		return "/";
	}
	
	// 운동 메이트 동의
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/agree")
	public int agree(Authentication authentication) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		System.out.println(customUser.getUno());
		return 1;
	}
	
	// 운동 메이트 거절
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/reject")
	public int reject(Authentication authentication) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		System.out.println(customUser.getUno());
		return 1;
	}
}
