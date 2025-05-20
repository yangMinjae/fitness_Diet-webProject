package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.serofit.domain.BoardVO;
import com.serofit.domain.FileVO;
import com.serofit.domain.FollowVO;
import com.serofit.domain.MateVO;
import com.serofit.domain.MypageProfileDTO;
import com.serofit.domain.ProfileDTO;
import com.serofit.domain.ProfileModalDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.FileMapper;
import com.serofit.mapper.FollowMapper;
import com.serofit.mapper.MateMapper;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class MyPageServiceImpl implements MyPageService{
	
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	UProfileMapper upMapper;
	
	@Autowired
	FileMapper fileMapper;
	
	@Autowired
	FollowMapper followMapper;
	
	@Autowired
	MateMapper mMapper;
	
	@Autowired
	BoardMapper bMapper;
	
	// 유저 프로필 사진/닉네임 가져오기
	@Override
	public ProfileDTO getProfileSet(int uno) {
		String nickname = uMapper.readNickname(uno);
		String uuid = upMapper.selectByUno(uno).getUuid();
		FileVO fvo = fileMapper.selectUprofileFile(uuid);
		ProfileDTO pdto = new ProfileDTO();
		pdto.setFvo(fvo);
		pdto.setNickname(nickname);
		pdto.setUno(uno);
		return pdto;
	}
	// ProfileDTO domain패키지에 만들었습니다.
	
	//------------------------------------------------------
	
	// 1) 내 프로필 영역
	
	// 1-1)유저 프로필 세부 정보 가져오기
	@Override
	public MypageProfileDTO getUserProfileInfo(int uno) {
		UProfileVO upVO = upMapper.selectByUno(uno);
		MateVO mVO = mMapper.findMate(uno);
		
		String nickname = uMapper.readNickname(uno);
		String uuid = upVO.getUuid();
		FileVO fVO = fileMapper.selectUprofileFile(uuid);
		
		
		MypageProfileDTO mpDTO = new MypageProfileDTO();
		mpDTO.setFVO(fVO);
		mpDTO.setUpVO(upVO);
		mpDTO.setMVO(mVO);
		mpDTO.getUVO().setNickname(nickname);
		mpDTO.getUVO().setUno(uno);
		mpDTO.initMpDTO();
		return mpDTO;
	}
	
	// 1-1-1) 유저 프로필 모달 정보 가져오기
	@Override
	@Transactional
	public ProfileModalDTO getProfileModalInfo(int uno) {
		ProfileModalDTO pmDTO = new ProfileModalDTO();
		
		List<BoardVO> bList = bMapper.getPostByUno(uno);
		UProfileVO upVO = upMapper.selectByUno(uno);
		String nickname = uMapper.readNickname(uno);
		int fCount = followMapper.getCountFollwer(uno);
		FileVO fvo = fileMapper.selectUprofileFile(upVO.getUuid());
		
		pmDTO.setBList(bList);
		pmDTO.setFCount(fCount);
		pmDTO.setNickname(nickname);
		pmDTO.setUpvo(upVO);
		pmDTO.setUno(uno);
		pmDTO.setFvo(fvo);
		
		return pmDTO;
	}
	
	// 1-2) 프로필 수정 기능
	@Override
	@Transactional
	public boolean ModifyUserProfile(MypageProfileDTO mpDTO) {
		UProfileVO upVO = upMapper.selectByUno(mpDTO.getUVO().getUno());
		mpDTO.getUpVO().setTag(upVO.getTag());
		mpDTO.initMpDTO();
		
		int result1 = upMapper.updateProfile(mpDTO.getUpVO());
		
		MateVO mVO = mMapper.findMate(mpDTO.getUVO().getUno());
		mpDTO.getMVO().setAge(mVO.getAge());
		mpDTO.getMVO().setGender(mVO.isGender());
		
		int result2 = mMapper.deleteMate(mpDTO.getUVO().getUno());
		int result3 = mMapper.insertMate(mpDTO.getMVO());
		
		return result1+result2+result3>=3 ? true : false;
	}
	
	//------------------------------------------------------
	
	// 2) 친구관리 기능 set
	
	// 2-1) 목록 가져오기
	// 여기서 uno는 로그인 된 당사자
	
	// 즐겨찾기 목록 가져오기
	@Override
	public List<ProfileDTO> getFavList(int uno){
		List<FollowVO> favList = followMapper.getFavList(uno); 
		List<ProfileDTO> pdtoList = new ArrayList<ProfileDTO>(); 
		for(FollowVO fvo : favList) {
			int favPersonUno = fvo.getCatcher();
			ProfileDTO pdto = getProfileSet(favPersonUno);
			pdtoList.add(pdto);
		}
		return pdtoList;
	}
	
	// 팔로우 목록
	@Override
	public List<ProfileDTO> getFollowList(int uno){
		
		List<FollowVO> followList = followMapper.getFollowList(uno); 
		List<ProfileDTO> pdtoList = new ArrayList<ProfileDTO>(); 
		for(FollowVO fvo : followList) {
			int followUno = fvo.getCatcher();
			ProfileDTO pdto = getProfileSet(followUno);
			pdto.setFav(fvo.isFav());
			pdtoList.add(pdto);
		}
		return pdtoList;
	}
	
	// 팔로워 목록
	@Override
	public List<ProfileDTO> getFollowerList(int uno){
		
		List<FollowVO> followerList = followMapper.getFollowerList(uno); 
		List<ProfileDTO> pdtoList = new ArrayList<ProfileDTO>(); 
		for(FollowVO fvo : followerList) {
			int followerUno = fvo.getThrower();
			ProfileDTO pdto = getProfileSet(followerUno);
			pdto.setFav(fvo.isFav());
			pdtoList.add(pdto);
		}
		return pdtoList;
	}
	
	// 2-2) 친구관리 
	// 여기서 uno는 팔로우, 줄겨찾기 추가/해제 할 대상
	
	// 팔로우
	// 컨트롤러에서 함수 사용시 fvo의 thrower에 유저 본인 uno, catcher에 선택한(팔로우할) 유저의 uno를 넣는다.
	@Override
	public boolean follow(FollowVO fvo) {
		int ifExist = followMapper.checkIfFollow(fvo);
		int result=0;
		if(ifExist==0) {
			result = followMapper.follow(fvo);
		}
		return result!=0 ? true : false;
	}
	
	// 언팔로우
	// 컨트롤러에서 함수 사용시 fvo의 thrower에 유저 본인 uno, catcher에 선택한(언팔로우할) 유저의 uno를 넣는다.
	@Override
	public boolean unfollow(FollowVO fvo) {
		int result = followMapper.unFollow(fvo);
		return result!=0 ? true : false;
	}
	
	// 즐겨찾기 추가
	// 컨트롤러에서 함수 사용시 fvo의 thrower에 유저 본인 uno, catcher에 선택한(즐겨찾기할) 유저의 uno를 넣는다.
	@Override
	public boolean addToFav(FollowVO fvo) {
		int result = followMapper.addToFav(fvo);
		return result!=0 ? true : false;
	}
	
	// 즐겨찾기 해제
	// 컨트롤러에서 함수 사용시 fvo의 thrower에 유저 본인 uno, catcher에 선택한(즐겨찾기 해제할) 유저의 uno를 넣는다.
	@Override
	public boolean removeFromFav(FollowVO fvo) {
		int result = followMapper.removeFromFav(fvo);
		return result!=0 ? true : false;
	}
	
}
