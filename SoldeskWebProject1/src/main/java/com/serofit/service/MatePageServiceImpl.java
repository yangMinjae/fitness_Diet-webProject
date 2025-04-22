package com.serofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.DietVO;
import com.serofit.domain.MateVO;
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
	@Override
	public List<Integer> getUnoByMate() {
		List<Integer> unoList = uPMapper.getUnoByMate();
		
		return unoList;
	}
	
	@Override
	public MateVO findMate(int uno) {
		MateVO mvo = mMapper.findMate(uno);
		return mvo;
	}
	
	@Override
	public DietVO selectOneDietByUno(int uno) {
		DietVO dvo = dMapper.selectOneDietByUno(uno);
		return dvo;
	}
}
