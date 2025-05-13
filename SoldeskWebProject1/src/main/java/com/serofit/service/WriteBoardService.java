package com.serofit.service;

import java.util.List;

import com.serofit.domain.BoardVO;
import com.serofit.domain.BoardViewDTO;
import com.serofit.domain.DietVO;

public interface WriteBoardService {
	
	// 유저의 식단 타이틀 리스트 가져오기
	public List<DietVO> getDietTitle(int uno);

	// 게시글 삽입
	public void register(BoardVO bvo);
	
	// 게시글 수정 시 기존 게시글 내용 가져오기
	public BoardViewDTO getBoard(int bno);
}
