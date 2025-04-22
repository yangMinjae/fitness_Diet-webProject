package com.serofit.mapper;

import java.util.List;

import com.serofit.domain.FollowVO;

public interface FollowMapper {
	
	// 팔로잉 목록 불러오기
	public List<FollowVO> getFollowList(int uno);
	
	// 팔로워 목록 불러오기
	public List<FollowVO> getFollowerList(int uno);
	
	// 즐겨찾기 목록 불러오기
	public List<FollowVO> getFavList(int uno);
	
	// 팔로우
	public int follow(FollowVO fvo);
	
	// 팔로우 취소
	public int unFollow(FollowVO fvo);
	
	// 즐겨찾기 추가
	public int addToFav(FollowVO fvo);
	
	// 즐겨찾기 해제
	public int removeFromFav(FollowVO fvo);
	
	// 회원 탈퇴시 팔로우 전체 삭제
	public int deleteFollowAll(int uno);
	
	// 팔로우 하려는 사람을 이미 팔로우 하고 있는지 확인
	public int checkIfFollow(FollowVO fvo);
}
