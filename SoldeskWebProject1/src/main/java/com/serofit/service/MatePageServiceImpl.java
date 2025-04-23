package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.DietVO;
import com.serofit.domain.MateDTO;
import com.serofit.domain.MateVO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.MateMapper;
import com.serofit.mapper.UProfileMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MatePageServiceImpl implements MatePageService{
	
	@Autowired
	UProfileMapper uPMapper;
	
	@Autowired
	MateMapper mMapper;
	
	@Autowired
	DietMapper dMapper;
	
	@Autowired
	MyPageService mservice;
	
	@Override
	public List<MateVO> findByNotUno(int uno) {
		return mMapper.findByNotUno(uno);
	}
	
	@Override
	public UProfileVO getUnoByMate(int uno) {
		return uPMapper.getUnoByMate(uno);
	}
	
	@Override
	@Transactional
	public List<MateDTO> findMateList(int uno) {
		List<MateDTO> mateList = new ArrayList<>();
		for (MateVO mvo : mMapper.findByNotUno(uno)) {
			MateDTO dto = new MateDTO();
			if (uPMapper.getUnoByMate(mvo.getUno()) != null) {
				dto.setMvo(mvo);
				dto.setPvo(uPMapper.getUnoByMate(mvo.getUno()));
				dto.setDto(mservice.getProfileSet(dto.getPvo().getUno()));
				
				mateList.add(dto);
			}			
		}
		
		return mateList;
	}
	
	@Override
	public UProfileVO selectByUno(int uno) {
		return uPMapper.selectByUno(uno);
	}
}
