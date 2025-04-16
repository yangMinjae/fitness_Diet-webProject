package com.serofit.mapper;


import java.util.List;

import com.serofit.domain.BoardVO;
import com.serofit.domain.LikeVO;

public interface LikeMapper {
	// 좋아요 게시글, 좋아요 유저 찾기
	public List<LikeVO> findBnobyUno(int uno);
	public List<LikeVO> findUnobyBno(int bno);
	
	// 좋아요 취소
	public int deleteByBnoAndUno(LikeVO lvo);
	
	// 게시글 삭제
	public int deleteByBno(int bno);
}
