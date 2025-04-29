package com.serofit.mapper;

import java.util.List;

import com.serofit.domain.MateDTO;
import com.serofit.domain.MateVO;

public interface MateMapper {
	
	// 운동 메이트 찾기
	public MateVO findMate(int uno);
	
	// 자신을 제외한 운동 메이트 찾기
	public List<MateVO> findByNotUno(int uno);
	
	// 설문 결과 저장
	public int insertMate(MateVO mvo);
	
	// 회원 탈퇴시 메이트 삭제
	public int deleteMate(int uno);
	
	// 운동 메이트 클릭 시 프로필 가져오기
	public MateVO findProfile(int uno);
}
