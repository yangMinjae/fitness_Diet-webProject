package com.serofit.mapper;

import com.serofit.domain.UProfileVO;

public interface UProfileMapper {
	
	// uuid 가져오기(인기게시글,프로필 이미지,마이페이지...)
	public UProfileVO selectByUno(int uno);
	// 프로필 수정
	public int updateProfile(UProfileVO upvo);
	// 프로필 삭제
	public int deleteProfile(int uno);
}
