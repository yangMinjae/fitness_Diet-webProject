package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.DietVO;
import com.serofit.domain.MateDTO;
import com.serofit.domain.MateVO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.DietMapper;
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
	
	// uno를 제외한 mate 테이블 모든 데이터 가져오기
	@Override
	public List<MateVO> findByNotUno(int uno) {
		return mMapper.findByNotUno(uno);
	}
	
	// 자신을 제외한 운동 메이트 찾기
	@Override
	public UProfileVO getUnoByMate(int uno) {
		return uPMapper.getUnoByMate(uno);
	}
	
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
	}
	
	// 자신의 tag 가져오기
	@Override
	public UProfileVO selectByUno(int uno) {
		return uPMapper.selectByUno(uno);
	}
	
	// 운동 메이트 클릭 시 프로필 가져오기
	public MateDTO findProfile(int uno){
		MateDTO ProfileList = new MateDTO();
		
		ProfileList.setMvo(mMapper.findProfile(uno));
		ProfileList.setDto(mservice.getProfileSet(uno));
		ProfileList.setPvo(uPMapper.selectByUno(uno));
		System.out.println("메이트페이지 서비스 임플 : " + ProfileList);
		
		return ProfileList; 
	}
}
