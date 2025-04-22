package com.serofit.service;

import java.util.List;

import com.serofit.domain.BoardListDTO;
import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;


public interface BoardListService {	
	// 게시글 목록 불러오기 
	public List<BoardListDTO> getPostList();

	// 특정 태그를 가진 유저의 게시글만 가져오기
	public List<BoardListDTO> getPostsByTag(String tag);
	
	// 내가 좋아요를 누른 글
	public List<BoardListDTO> getPostsByLove(int uno);
	
	
}
