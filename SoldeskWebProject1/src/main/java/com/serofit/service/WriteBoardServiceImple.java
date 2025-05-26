package com.serofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.BoardVO;
import com.serofit.domain.BoardViewDTO;
import com.serofit.domain.DietVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class WriteBoardServiceImple implements WriteBoardService {	
	@Autowired
	DietMapper dMapper;
	@Autowired
	BoardMapper bMapper;
	@Autowired
	UserMapper uMapper;
		
	// 유저의 식단 타이틀 리스트 가져오기
	@Override
	public List<DietVO> getDietTitle(int uno) {
		List<DietVO> dietList = dMapper.selectDietByUno(uno);
		return dietList;
	}
	
	// 게시글 작성하기
	@Override
	public void register(BoardVO bvo) {
		bMapper.insertPost(bvo);
	}
	// 게시글 수정 시 기존 게시글 내용 가져오기
	@Override
	public BoardViewDTO getBoard(int bno) {
		BoardVO bvo = bMapper.getPostByBno(bno);
		
		BoardViewDTO bvdto = new BoardViewDTO(
				bvo.getTitle(),
				uMapper.readNickname(bvo.getUno()),
				dMapper.selectDietByDno(bvo.getDno()).getTag(),
				bvo.getContent(),
				bvo.getRegDate(),
				bvo.getHit(),
				bvo.getLove(),
				bvo.getUno(),
				bvo.getBno(),
				bvo.getDno()
				);
		
		return bvdto;
	}
	// 게시글 삽입시 dno로 식단내용 가져오기
	@Override
	public DietVO getDietByDno(int dno) {
		return dMapper.selectDietByDno(dno);
	}
}
