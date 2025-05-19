package com.serofit.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.serofit.domain.FollowVO;
import com.serofit.domain.MypageProfileDTO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.ProfileModalDTO;

public interface MyPageService {
	// *) 공통
	
	// 유저 프로필 사진/닉네임 가져오기
	public ProfileDTO getProfileSet(int uno);
	// ProfileDTO domain패키지에 만들었습니다.
	
	//------------------------------------------------------
	
	// 1) 내 프로필 영역
	
	// 1-1)유저 프로필 세부 정보 가져오기
	public MypageProfileDTO getUserProfileInfo(int uno);
	
	// 1-1-1) 유저 프로필 모달 정보 가져오기
	public ProfileModalDTO getProfileModalInfo(int uno);
	
	// 1-2) 프로필 수정 기능
	public boolean ModifyUserProfile(MypageProfileDTO mpDTO);
	
	//------------------------------------------------------
	
	// 2) 친구관리 기능 set
	
	// 2-1) 목록 가져오기
	// 여기서 uno는 로그인 된 당사자
	
	// 즐겨찾기 목록 가져오기
	public List<ProfileDTO> getFavList(int uno);
	
	// 팔로우 목록
	public List<ProfileDTO> getFollowList(int uno);
	
	// 팔로워 목록
	public List<ProfileDTO> getFollowerList(int uno);
	// 2-2) 친구관리 
	// 여기서 uno는 팔로우, 줄겨찾기 추가/해제 할 대상
	
	// 팔로우
	public boolean follow(FollowVO fvo);
	
	// 언팔로우
	public boolean unfollow(FollowVO fvo);
	
	// 즐겨찾기 추가
	public boolean addToFav(FollowVO fvo);
	
	// 즐겨찾기 해제
	public boolean removeFromFav(FollowVO fvo);
	
}
