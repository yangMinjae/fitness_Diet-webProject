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

import com.serofit.domain.FollowVO;
import com.serofit.domain.LoginDTO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.FollowMapper;
import com.serofit.service.LoginService;
import com.serofit.service.MatePageService;
import com.serofit.service.SignupService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/mate")
public class MateController {
	
	@Autowired
	MatePageService mtpService;
	
	@Autowired
	FollowMapper fMapper;
	
	// 운동 메이트 찾기 화면에서 유저 프로필 불러오기
	@GetMapping("/findProfile")
	public String findProfile(Model model, @RequestParam int uno, @RequestParam int uno1) {
		// 팔로우를 하고 있는지 확인
		model.addAttribute("result", mtpService.checkIfFollow(uno, uno1));
		
		// 클릭한 사람의 정보 가져오기
		model.addAttribute("profile", mtpService.findProfile(uno));
		
		System.out.println(uno);
		return "/user/profile";
	};
	
	@PostMapping("/unfollow")
	@ResponseBody
	public boolean unfollow(int uno, int uno1) {
		FollowVO fvo = new FollowVO();
		// 언팔을 하려고 하는 사람
		fvo.setThrower(uno1);
		
		// 언팔을 당하는 사람
		fvo.setCatcher(uno);
		return fMapper.unFollow(fvo) == 1;
	}
	
	@PostMapping("/follow")
	@ResponseBody
	public boolean follow(int uno, int uno1) {
		FollowVO fvo = new FollowVO();
		// 팔로우 하려고 하는 사람
		fvo.setThrower(uno1);
		
		// 팔로우 당하는 사람
		fvo.setCatcher(uno);
		return fMapper.follow(fvo) == 1;
	}
}
