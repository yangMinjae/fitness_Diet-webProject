package com.serofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.BoardListDTO;
import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.domain.UserVO;
import com.serofit.service.BoardListService;
import com.serofit.service.WriteBoardService;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/cjs/")
public class CjsController {
	
	@Autowired
	private BoardListService blService; 	
	@Autowired
	private WriteBoardService wbService;
	
	// 전체게시글 페이지로 이동 (동기)
	@GetMapping("/boardList")
	public String list(Model model) {			
		log.info("boardList....");		
		// 게시글 목록 가져오기
		List<BoardListDTO> list = blService.getPostList(); 
		
		// model에 추가
		model.addAttribute("list", list); 

		return "cjs/boardList";
	}
	
	// 전체 게시글 불러오기(비동기)
	@ResponseBody
	@GetMapping(value ="/getAllBoardList", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public List<BoardListDTO> getAllList(){
		log.info("getAllBoardList....");
	
		return blService.getPostList();
	}
	
	// 태그로 게시글 불러오기 (비동기)
	@ResponseBody
	@GetMapping(value = "/boardList/{tag}" , produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<BoardListDTO> getTagList(@PathVariable("tag") String tag){
		log.info("getTagList by tag : " + tag);
		
		return blService.getPostsByTag(tag);
	}
	
	// 좋아요 누른 게시글 가져오기 (비동기)
	@ResponseBody
	@GetMapping(value = "/boardList/love", produces =MediaType.APPLICATION_JSON_UTF8_VALUE )
	public List<BoardListDTO> getPostsByLove(){
		
		
		int uno = 2;
		return blService.getPostsByLove(uno);
	}
	

	// 게시글 작성 페이지로 이동 + 식단 title 가져오기 
		@GetMapping("/writeBoard")
		public String writePost(int uno, Model model) {
			log.info("writePost .... " + uno);
			List<DietVO> dvoList = wbService.getDietTitle(uno);
			model.addAttribute("dietList", dvoList);
			return "cjs/writeBoard";
		}
	// 게시글 등록
		@PostMapping("/writeBoard")
		public String register(BoardVO bvo) {
			log.info("Register...." + bvo);
			
			wbService.register(bvo);
			return "redirect:/cjs/boardList";
		}
}
