package com.serofit.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.serofit.domain.BoardVO;

public interface BoardMapper {
	
	// 게시글 불러오기
	public BoardVO getPostByBno(int bno);
	
	// 인기 게시글 가져오기
	public List<BoardVO> getHotPosts(int quantity);
	
	// 게시글 목록 불러오기
	public List<BoardVO> getPostList();	

	// 조회수 업데이트
	public int updateHit(int bno);
	
	// 좋아요 업데이트
	public int updateLike(@Param("bno") int bno, @Param("plOrMi") int plOrMi);	
	// int plOrMi -> plusOrMinus - 서비스에서 1아니면 -1을 전달	
	
	// 게시글 작성
	public int insertPost(BoardVO bvo);
	
	// 게시글 삭제
	public int deletePostByBno(int bno);
	
	// 회원탈퇴 게시글 삭제
	public int deletePostByUno(int uno);
}
