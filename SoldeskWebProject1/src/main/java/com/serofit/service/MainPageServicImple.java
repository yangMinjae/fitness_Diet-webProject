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
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MainPageServicImple implements MainPageService{
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
	
	@Override
	public List<HotBoardDTO> getHotPosts(int quantity) {
		HotBoardDTO hbDTO = new HotBoardDTO();		
		List<HotBoardDTO> hbList = new ArrayList<HotBoardDTO>();
		
		List<BoardVO> bList = bMapper.getHotPosts(quantity);
		
		for (BoardVO boardVO : bList) {
			UProfileVO upVO = upMapper.selectByUno(boardVO.getUno());
			FileVO fVO = fMapper.selectUprofileFile(upVO.getUuid());
			hbDTO.setImgPath(fVO.getUuid() + fVO.getFileName() + fVO.getPath());
			
			DietVO dVO = dMapper.selectDietByDno(boardVO.getDno());
			hbDTO.setTag(dVO.getTag());
			
			hbDTO.setNickname(uMapper.readNickname(boardVO.getUno()));
			hbDTO.setTitle(boardVO.getTitle());
			hbDTO.setRegdate(boardVO.getRegDate());
			hbList.add(hbDTO);
		}
		
		return hbList;
	}
}
