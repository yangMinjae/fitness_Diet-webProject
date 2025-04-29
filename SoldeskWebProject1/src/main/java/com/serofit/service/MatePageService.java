package com.serofit.service;

import java.util.List;

import com.serofit.domain.DietVO;
import com.serofit.domain.MateDTO;
import com.serofit.domain.MateVO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.UProfileVO;

public interface MatePageService {
	
	// uno를 제외한 mate 테이블 모든 데이터 가져오기
	public List<MateVO> findByNotUno(int uno);
	
	// 자신을 제외한 운동 메이트 찾기
	public UProfileVO getUnoByMate(int uno);
	
	// 운동 메이트 목록 불러오기
	public List<MateDTO> findMateList(int uno);
	
	// 자신의 tag 가져오기
	public UProfileVO selectByUno(int uno);
	
	// 운동 메이트 클릭 시 프로필 가져오기
	public MateDTO findProfile(int uno);
}
