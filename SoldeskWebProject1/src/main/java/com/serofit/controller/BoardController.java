package com.serofit.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.serofit.domain.BoardListDTO;
import com.serofit.domain.BoardVO;
import com.serofit.domain.BoardViewDTO;
import com.serofit.domain.DietVO;
import com.serofit.domain.LikeVO;
import com.serofit.security.domain.CustomUser;
import com.serofit.service.BoardService;
import com.serofit.service.WriteBoardService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/board")

public class BoardController {
	@Autowired
	private BoardService bService;
	
	@Autowired
	private WriteBoardService wbService;
		
	// 전체 게시글 불러오기(비동기)
	@ResponseBody
	@GetMapping(value ="/getAllBoardList", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	public List<BoardListDTO> getAllList(){
		log.info("getAllBoardList....");
	
		return bService.getPostList();
	}
	
	// 태그로 게시글 불러오기 (비동기)
	@ResponseBody
	@GetMapping(value = "/boardList/{tag}" , produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<BoardListDTO> getTagList(@PathVariable("tag") String tag){
		log.info("getTagList by tag : " + tag);
		
		return bService.getPostsByTag(tag);
	}
	
	// 좋아요 누른 게시글 가져오기 (비동기)
	@ResponseBody
	@GetMapping(value = "/boardList/love", produces =MediaType.APPLICATION_JSON_UTF8_VALUE )
	public List<BoardListDTO> getPostsByLove(){
		
		// uno 수정 필요!!
		int uno = 2;
		return bService.getPostsByLove(uno);
	}
	

	// 게시글 작성 페이지로 이동 + 식단 title 가져오기 
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/writeBoard")
	public String writePost(Model model, Authentication authentication) {
		log.info("writePost .... ");				
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		List<DietVO> dvoList = wbService.getDietTitle(customUser.getUno());
		model.addAttribute("dietList", dvoList);
		return "/board/writeBoard";
	}
	
	
	// 게시글 등록
	@PostMapping("/writeBoard")
	public String register(BoardVO bvo) {
		log.info("Register...." + bvo);
		
		wbService.register(bvo);
		return "redirect:/boardList";
	}
	

	// 게시글 자세히 보기
	@GetMapping("/boardView")
	public String boardViewPage(Model model, int bno, HttpServletRequest request, HttpServletResponse response
			, Authentication authentication) {
		log.info("boradView...!!");
		
		// 1. 쿠키로 조회 체크
	    String cookieName = "viewed_bno_" + bno;
	    boolean alreadyViewed = false;

	    Cookie[] cookies = request.getCookies();
	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            if (cookieName.equals(cookie.getName())) {
	                alreadyViewed = true;
	                break;
	            }
	        }
	    }

	    // 2. 조회수 증가 조건
	    if (!alreadyViewed) {
	        bService.increaseHit(bno); // 조회수 +1

	        Cookie viewCookie = new Cookie(cookieName, "true");
	        viewCookie.setMaxAge(60 * 30); // 30분간 유지
	        viewCookie.setPath("/");      // 전체 경로에서 유효
	        response.addCookie(viewCookie);
	    }
		
		Gson gson = new Gson();
		String jsonBList = gson.toJson(bService.getPostList());

		model.addAttribute("isLike", false);
		
		if(authentication != null) {
			CustomUser customUser = (CustomUser) authentication.getPrincipal();
			LikeVO lvo = new LikeVO(customUser.getUno(), bno);
			
			if(bService.isLoveBoardByUno(lvo) > 0)			
				model.addAttribute("isLike", true);
		}
		
		model.addAttribute("bvDTO", bService.getPost(bno));
		model.addAttribute("bList", jsonBList);
		return "/board/boardView";
	}
	// 게시글 수정
	@PostMapping("/updateBoard")
	public String updatePost(BoardVO bvo ) {
		log.info("updatePost...." );
		bService.updatePost(bvo);
		return "redirect:/boardList";
	}
	
	// 게시글 좋아요 증가
	@PreAuthorize("isAuthenticated()")
	@ResponseBody
	@PostMapping("/boardView/love")
	public int boardViewLove(Model model, @RequestBody LikeVO lvo) {	
		System.out.println("love");
		if(bService.increaseLove(lvo) > 0) {
			model.addAttribute("isLike", true);
			model.addAttribute("bvDTO",	bService.getPost(lvo.getBno())); 
		}	 
		
		return lvo.getBno();
	}
	
	// 게시글 좋아요 감소
	@PreAuthorize("isAuthenticated()")
	@ResponseBody
	@PostMapping("/boardView/unlove")
	public int boardViewUnLove(Model model, @RequestBody LikeVO lvo) {	
		System.out.println("unlove");
		if(bService.decreaseLove(lvo) > 0) {	
			model.addAttribute("isLike", false);
			model.addAttribute("bvDTO",	bService.getPost(lvo.getBno())); 
		}	 
		
		return lvo.getBno();
	}
	

	// 게시글 수정 페이지로 이동
	@GetMapping("/updateBoard")
	public String updateBoard(Authentication authentication, int bno, Model model) {
		log.info("writePost .... ");		
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		BoardViewDTO bvdto = wbService.getBoard(bno);
		List<DietVO> dvoList = wbService.getDietTitle(customUser.getUno());
		
		model.addAttribute("board",bvdto);
		model.addAttribute("dietList", dvoList);
		
		return "board/writeBoard";
	}
	

	
	// 게시글 삭제
	@PostMapping("/boardView/delete")
	public String boardViewDelete(int bno) {
		bService.deletePost(bno);
		
		return "redirect:/boardList";
	}
}
