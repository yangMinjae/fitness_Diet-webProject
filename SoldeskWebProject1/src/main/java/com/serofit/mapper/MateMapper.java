package com.serofit.mapper;

import com.serofit.domain.MateVO;

public interface MateMapper {
	
	// 운동 메이트 찾기
	public MateVO findMate(int uno);
	
	// 설문 결과 저장
	public int insertMate(MateVO mvo);
	
	// 회원 탈퇴시 메이트 삭제
	public int deleteMate(int uno);
	
}
