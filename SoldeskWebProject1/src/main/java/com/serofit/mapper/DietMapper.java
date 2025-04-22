package com.serofit.mapper;

import java.util.List;

import com.serofit.domain.DietVO;

public interface DietMapper {
	
	// 식단 결과 저장하기
	public int insertDiet(DietVO dvo);
	
	// UNO로 식단 목록 불러오기
	public List<DietVO> selectDietByUno(int uno);
	
	// UNO로 식단 삭제
	public int deleteDietByUno(int uno);
	
	// DNO로 TAG 가져오기
	public DietVO selectDietByDno(int dno);
	
	// UNO로 TAG 가져오기
	public DietVO selectOneDietByUno(int uno);
}
