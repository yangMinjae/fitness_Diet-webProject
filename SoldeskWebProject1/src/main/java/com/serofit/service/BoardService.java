package com.serofit.service;

import java.util.List;

import com.serofit.domain.BoardListDTO;
import com.serofit.domain.BoardVO;
import com.serofit.domain.BoardViewDTO;
import com.serofit.domain.DietVO;
import com.serofit.domain.LikeVO;


public interface BoardService {	
	
	// 게시글 목록 불러오기 
	public List<BoardListDTO> getPostList();

	// 특정 태그를 가진 유저의 게시글만 가져오기
	public List<BoardListDTO> getPostsByTag(String tag);
	
	// 내가 좋아요를 누른 글
	public List<BoardListDTO> getPostsByLove(int uno);
	
	// 특정 게시글 불러오기
	public BoardViewDTO getPost(int bno);
	
	// 게시글 좋아요 증가
	public int increaseLove(LikeVO lvo);
	
	// 게시글 삭제
	public int deletePost(int bno);
	
	// 조회수 증가
	public int increaseHit(int bno);
}
