package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.DietVO;
import com.serofit.domain.FollowVO;
import com.serofit.domain.MateDTO;
import com.serofit.domain.MateVO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.FollowMapper;
import com.serofit.mapper.MateMapper;
import com.serofit.mapper.UProfileMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MatePageServiceImpl implements MatePageService{
	
	@Autowired
	UProfileMapper uPMapper;
	
	@Autowired
	MateMapper mMapper;
	
	@Autowired
	DietMapper dMapper;
	
	@Autowired
	MyPageService mservice;
	
	@Autowired
	FollowMapper fMapper;
	
	// uno를 제외한 mate 테이블 모든 데이터 가져오기
	@Override
	public List<MateVO> findByNotUno(int uno) {
		return mMapper.findByNotUno(uno);
	};
	
	// 자신을 제외한 운동 메이트 찾기
	@Override
	public UProfileVO getUnoByMate(int uno) {
		return uPMapper.getUnoByMate(uno);
	};
	
	// 운동 메이트 목록 불러오기
	@Override
	@Transactional
	public List<MateDTO> findMateList(int uno) {
		List<MateDTO> mateList = new ArrayList<>();
		for (MateVO mvo : mMapper.findByNotUno(uno)) {
			MateDTO dto = new MateDTO();
			if (uPMapper.getUnoByMate(mvo.getUno()) != null) {
				dto.setMvo(mvo);
				dto.setPvo(uPMapper.getUnoByMate(mvo.getUno()));
				dto.setDto(mservice.getProfileSet(dto.getPvo().getUno()));
				
				mateList.add(dto);
			}			
		}
		
		return mateList;
	};
	
	// 자신의 tag 가져오기
	@Override
	public UProfileVO selectByUno(int uno) {
		return uPMapper.selectByUno(uno);
	};
	
	// 운동 메이트 클릭 시 프로필 가져오기
	public MateDTO findProfile(int uno){
		MateDTO ProfileList = new MateDTO();
		
		ProfileList.setMvo(mMapper.findProfile(uno));
		ProfileList.setDto(mservice.getProfileSet(uno));
		ProfileList.setPvo(uPMapper.selectByUno(uno));
		
		return ProfileList; 
	};
	
	// 팔로우 하려는 사람을 이미 팔로우 하고 있는지 확인
	@Override
	public int checkIfFollow(int uno, int uno1) {
		FollowVO fvo = new FollowVO();
		// 팔로우를 한 사람 (로그인 한 사람)
		fvo.setThrower(uno1);
		
		// 팔로우를 당한 사람 (메이트에 뜬 사람)
		fvo.setCatcher(uno);
		return fMapper.checkIfFollow(fvo);
	}
}
