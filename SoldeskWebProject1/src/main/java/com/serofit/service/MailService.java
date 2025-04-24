package com.serofit.service;

import java.util.List;

import com.serofit.domain.FollowMailDTO;
import com.serofit.domain.FollowVO;
import com.serofit.domain.MailVO;
import com.serofit.domain.ReceiveMailDTO;

public interface MailService {
	
	// 메일 목록 가져오기
	public List<ReceiveMailDTO> selectByReceiver(int receiver);
	
	// 팔로우 한 사람 목록 가져오기
	public List<FollowMailDTO> getFollowList(int uno);
	
	// 메일 보내기
	public int insertMail(MailVO mvo);
}
