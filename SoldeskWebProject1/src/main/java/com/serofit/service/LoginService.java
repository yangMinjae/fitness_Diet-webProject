package com.serofit.service;

import com.serofit.domain.LoginDTO;
import com.serofit.domain.UserVO;

public interface LoginService {
	
	// 로그인 확인
	public String login(LoginDTO ldto);
	
	// 아이디 비밀번호 찾기
	public UserVO findID(String email);
	
	// 비밀번호 수정
	public int updatePW(UserVO uvo);
}
