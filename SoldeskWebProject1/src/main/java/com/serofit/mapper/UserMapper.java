package com.serofit.mapper;

import com.serofit.domain.UserVO;

public interface UserMapper {
	
	// 인기 게시글 가져오기, 프로필 이미지 가져오기, 회원 정보
	public String readNickname(int uno);
	
	// 회원 정보 등록
	public int insertUser(UserVO uvo);
	
	// 이메일 중복 확인
	public int validateEmail(String email);
	
	// 로그인
	public String login(UserVO uvo);
	
	// id/pw 찾기
	public UserVO findIdPwByEmail(String email);
	
	// 회원 탈퇴
	public int deleteUser(int uno);
	
}
