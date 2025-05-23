package com.serofit.service;

import java.util.List;

import com.serofit.domain.HotBoardDTO;

public interface MainPageService {
	
	// 인기 게시글 불러오기
	public List<HotBoardDTO> getHotPosts(int quantity);	
	
	// 메이트 동의
	public String updateMateAgree(int uno);
	
	// 메이트 거절
	public String updateMateReject(int uno);
	
	// 식단 여부 확인
	public String getCountDiet(int uno);
}
