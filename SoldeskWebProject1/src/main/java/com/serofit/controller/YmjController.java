package com.serofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.FollowVO;
import com.serofit.domain.LoginDTO;
import com.serofit.domain.MypageProfileDTO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.TestDTO;
import com.serofit.service.LoginService;
import com.serofit.service.MyPageService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/ymj/*")
public class YmjController {
	@Autowired
	MyPageService mService;
	
	@Autowired
	LoginService lService;
	// -------------------------마이페이지-----------------------------------
	@GetMapping("/myPage")
	public void showMyPage() {
		log.info("....forwarding to myPage....");
	}
	
	@ResponseBody
	@PostMapping(value = "/getProfileInfo", consumes = MediaType.TEXT_PLAIN_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public MypageProfileDTO getProfileInfo(@RequestBody String uno) {
		log.info("!!!!!!!!!!!!!!!!!!!!!uno!!!!!!!!!!!!!!!!!!!!!"+uno);
		uno = 1+"";			// 추후 삭제
		MypageProfileDTO mpDTO = mService.getUserProfileInfo(Integer.parseInt(uno));
		return mpDTO;
	}
	
	@PostMapping("/updateProfile")
	public String updateProfile(MypageProfileDTO mpDTO) {
		log.info("!!!내 프로필 수정!!!");
		log.info("???????????????-"+mpDTO.getUVO().getUno());
		mService.ModifyUserProfile(mpDTO);
		
		return "redirect:/ymj/myPage";
	}
	
	@ResponseBody
	@GetMapping(value = "/getFavList/{uno}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ProfileDTO> getFabList(@PathVariable int uno){
		log.info("즐겨찾기 목록");
		List<ProfileDTO> pDTOList = mService.getFavList(uno);
		return pDTOList;
	}
	
	@ResponseBody
	@GetMapping(value = "/getFollowList/{uno}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ProfileDTO> getFollowList(@PathVariable int uno){
		log.info("팔로우 목록");
		List<ProfileDTO> pDTOList = mService.getFollowList(uno);
		return pDTOList;
	}
	
	@ResponseBody
	@GetMapping(value = "/getFollowerList/{uno}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ProfileDTO> getFollowerList(@PathVariable int uno){
		log.info("팔로워 목록");
		List<ProfileDTO> pDTOList = mService.getFollowerList(uno);
		return pDTOList;
	}
	
	
	@ResponseBody
	@DeleteMapping(value = "/removeFav" ,produces = MediaType.TEXT_PLAIN_VALUE)
	public String removeFav(@RequestBody FollowVO fvo) {
		log.info("즐겨찾기 해제");
		boolean result = mService.removeFromFav(fvo);
		return result? "success" : "fail";
	}
	
	@ResponseBody
	@PutMapping(value = "/addFav", produces = MediaType.TEXT_PLAIN_VALUE)
	public String addFav(@RequestBody FollowVO fvo) {
		log.info("즐겨찾기 추가");
		boolean result = mService.addToFav(fvo);
		return result? "success" : "fail";
	}
	
	@ResponseBody
	@DeleteMapping(value = "/cancelFollow", produces = MediaType.TEXT_PLAIN_VALUE)
	public String cancelFollow(@RequestBody FollowVO fvo) {
		log.info("팔로우 취소");
		boolean result = mService.unfollow(fvo);
		return result? "success" : "fail";
	}
	
	@ResponseBody
	@PutMapping(value = "/addFollow", produces = MediaType.TEXT_PLAIN_VALUE)
	public String addFollow(@RequestBody FollowVO fvo) {
		log.info("팔로우 하기");
		boolean result = mService.follow(fvo);
		return result? "success" : "fail";
	}
	// -------------------------------------------------------------------------------
	// -------------------------------로그인------------------------------------------
	@GetMapping("/login")
	public void showLoginPage() {
		log.info("....forwarding to LoginPage....");
		
	}
	@ResponseBody
	@PostMapping(value = "/login", produces = MediaType.TEXT_PLAIN_VALUE)
	public String login(@RequestBody LoginDTO ldto) {
		String result = lService.login(ldto);
		return result!="0" ? result : "fail";
	}
	// -------------------------------------------------------------------------------
}
