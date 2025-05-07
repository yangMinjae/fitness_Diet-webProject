package com.serofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.service.BoardService;
import com.serofit.service.WriteBoardService;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/cjs/")
public class CjsController {
	
//	@Autowired
//	private BoardService blService; 	
	@Autowired
	private WriteBoardService wbService;
		

	// 게시글 작성 페이지로 이동 + 식단 title 가져오기 
		@GetMapping("/writeBoard")
		public String writePost(int uno, Model model) {
			log.info("writePost .... " + uno);
			List<DietVO> dvoList = wbService.getDietTitle(uno);
			model.addAttribute("dietList", dvoList);
			return "board/writeBoard";
		}
	// 게시글 등록
		@PostMapping("/writeBoard")
		public String register(BoardVO bvo) {
			log.info("Register...." + bvo);
			
			wbService.register(bvo);
			return "redirect:/boardList";
		}
		
}
