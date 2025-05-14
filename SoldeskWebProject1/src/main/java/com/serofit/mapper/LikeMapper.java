package com.serofit.mapper;


import java.util.List;

import com.serofit.domain.BoardVO;
import com.serofit.domain.LikeVO;

public interface LikeMapper {
	
	// 좋아요 게시글 찾기
	public List<LikeVO> findBnoByUno(int uno);
	
	// 좋아요 해제
	public int deleteByBnoAndUno(LikeVO lvo);
	
	// 좋아요 등록
	public int insertByBnoAndUno(LikeVO lvo);
	
	// 게시글 삭제
	public int deleteByBno(int bno);
	
	// 유저 탈퇴 좋아요 삭제
	public int deleteByUno(int uno);
	
	// 특정 좋아요 게시글 찾기
	public int isLoveBoardByUno(LikeVO lvo);
	
}
