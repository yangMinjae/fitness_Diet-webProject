package com.serofit.mapper;


import java.util.List;

import com.serofit.domain.BoardVO;

public interface BoardMapper {
	
	// 게시글 불러오기
	public BoardVO getPost();
	
	// 조회수 업데이트
	public int updateHit();
	
	// 좋아요 업데이트
	public int updateLike();
	
	// 인기 게시글 가져오기
	public List<BoardVO> getHotPosts(int quantity);
	
	// 게시글 목록 불러오기
	public List<BoardVO> getPostList();
	
	// 게시글 작성
	public int insertPost();
	
	// 게시글 삭제
	public int deletePostByBno();
	
	// 회원탈퇴 게시글 삭제
	public int deletePostByUno();
}
