package com.serofit.service;

import java.util.List;

import com.serofit.domain.DietVO;
import com.serofit.domain.MateVO;

public interface MatePageService {
	
	// mate 값이 1 인 user 전부
	public List<Integer> getUnoByMate();
	
	// uno 값으로 mate 가져오기
	public MateVO findMate(int uno);
	
	// uno 값으로 diet tag 가져오기
	public DietVO selectOneDietByUno(int uno);
}
