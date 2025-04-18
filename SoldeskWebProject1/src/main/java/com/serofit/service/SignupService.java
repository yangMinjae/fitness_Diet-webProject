package com.serofit.service;

import com.serofit.domain.UserVO;

public interface SignupService {

	// 아이디 중복 확인
	public int validateId(String id);

	// 이메일 중복 확인
	public int validateEmail(String email);

	// 닉네임 중복 확인
	public int validateNickname(String nickname);
	
	// 회원가입
	public int insertUser(UserVO uvo);
}
