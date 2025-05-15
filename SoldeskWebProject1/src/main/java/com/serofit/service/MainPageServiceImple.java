package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.domain.FileVO;
import com.serofit.domain.HotBoardDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.FileMapper;
import com.serofit.mapper.MailMapper;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MainPageServiceImple implements MainPageService{
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	BoardMapper bMapper;
	
	@Autowired
	FileMapper fMapper;
	
	@Autowired
	UProfileMapper upMapper;
	
	@Autowired
	DietMapper dMapper;	
	
	// 인기 게시글 불러오기
	@Override
	public List<HotBoardDTO> getHotPosts(int quantity) {
		// DTOList
		List<HotBoardDTO> hbList = new ArrayList<HotBoardDTO>();
		
		// 인기 게시글 가져오기
		List<BoardVO> bList = bMapper.getHotPosts(quantity);
		
		for (BoardVO boardVO : bList) {
			// DTO 생성
			HotBoardDTO hbDTO = new HotBoardDTO();
			
			// Uno 통해서 Uuid 가져 온 후 FilePath 생성
			UProfileVO upVO = upMapper.selectByUno(boardVO.getUno());
			FileVO fVO = fMapper.selectUprofileFile(upVO.getUuid());
			hbDTO.setImgPath(fVO.getUuid() + fVO.getFileName() + fVO.getPath());
			
			// 식단 태그 가져오기
			DietVO dVO = dMapper.selectDietByDno(boardVO.getDno());
			hbDTO.setTag(dVO.getTag());
			
			// DTO에 변수 설정
			hbDTO.setNickname(uMapper.readNickname(boardVO.getUno()));
			hbDTO.setTitle(boardVO.getTitle());
			hbDTO.setRegdate(boardVO.getRegDate());
			hbDTO.setBno(boardVO.getBno());
			hbList.add(hbDTO);
		}
		
		return hbList;
	}
	
	@Override
	public String updateMateAgree(int uno) {
		return upMapper.updateMateAgree(uno) == 1 ? "true" : "false";
	}
	
	@Override
	public String updateMateReject(int uno) {
		return upMapper.updateMateReject(uno) == 1 ? "true" : "false";
	}
}
