package com.serofit.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.BoardListDTO;
import com.serofit.domain.MateDTO;
import com.serofit.domain.ProfileDTO;
import com.serofit.service.BoardService;
import com.serofit.service.HFService;
import com.serofit.service.MailService;
import com.serofit.service.MainPageService;
import com.serofit.service.MatePageService;

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
	
	// 서버 구동 시 mainPage
	@GetMapping()
	public String home(Locale locale, Model model, @RequestParam(value = "uno", defaultValue = "1") String uno) {
		log.info("main!!!!!");
		model.addAttribute("hbList", mpService.getHotPosts(4)); // 인기 게시글 갯수 4개로 고정
		if(uno != null) {
			model.addAttribute("nickname", hfService.getNickname(Integer.parseInt(uno)));
			model.addAttribute("mCount", hfService.selectMailCountByReceiver(Integer.parseInt(uno)));
		}

		return "main";
	}
	
	// 로그인 페이지 이동
	@GetMapping("/login")
	public String showLoginPage() {
		log.info("....forwarding to LoginPage....");
		return "/sign/login";
	}
	
	// 마이페이지 이동
	@GetMapping("/myPage")
	public String showMyPage() {
		log.info("....forwarding to myPage....");
		return "/user/myPage";
	}
	
	// 메일 목록 화면
	@GetMapping("/mailList")
	public String mailPage(Model model) {
		
		model.addAttribute("mList", mService.selectByReceiver(1));
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
	@GetMapping("/matePage")
	public String matePage(Model model, int uno) {
		// uno 임시 부여 
		// , int uno 매개변수에 추가하기
		int uno1 = 3;
		model.addAttribute("user", mtpService.selectByUno(uno1));
		model.addAttribute("mateList", mtpService.findMateList(uno1));
	
		return "/user/matePage";
	}
	
	// 설문 조사 페이지 이동
	@GetMapping("/survey")
	public String serveyPage(Model model) {
		return "/survey/surveyPage";
	}
}
