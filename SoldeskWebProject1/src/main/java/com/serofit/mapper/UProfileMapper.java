package com.serofit.mapper;

import java.util.List;

import com.serofit.domain.UProfileVO;

public interface UProfileMapper {
	
	// 프로필 가져오기(UUID, 인기게시글, 프로필 이미지, 마이페이지...)
	public UProfileVO selectByUno(int uno);
	
	// 프로필 수정
	public int updateProfile(UProfileVO upvo);
	
	// 프로필 삭제
	public int deleteProfile(int uno);
	
	// 회원 생성시 기본 프로필생성
	public int insertProfile(UProfileVO upvo);
	
	// tbl_uprofile 테이블에서 uno 일치와 mate가 1인 모든 데이터 가져오기
	public UProfileVO getUnoByMate(int uno);
}
