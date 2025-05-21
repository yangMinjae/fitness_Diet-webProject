package com.serofit.service;

import java.util.List;

import com.serofit.domain.FollowMailDTO;
import com.serofit.domain.FollowVO;
import com.serofit.domain.MailVO;
import com.serofit.domain.ReceiveMailDTO;

public interface MailService {
	
	// 받은 사람 기준 메일 목록 가져오기
	public List<ReceiveMailDTO> selectByReceiver(int receiver);
	
	// 보낸 사람 기준 메일 목록 가져오기
	public List<ReceiveMailDTO> selectBySender(int sender);
	
	// 팔로우 한 사람 목록 가져오기
	public List<FollowMailDTO> getFollowList(int uno);
	
	// 메일 보내기
	public int insertMail(MailVO mvo);
	
	// 메일 확인 시 update
	public int updateByReadMail(int mno);
	
	// 메일 안 읽은 수 가져오기
	public int selectMailCountByReceiver(int receiver);
	
}
