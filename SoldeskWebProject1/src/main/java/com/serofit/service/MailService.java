package com.serofit.service;

import java.util.List;

import com.serofit.domain.MailVO;
import com.serofit.domain.ReceiveMailDTO;

public interface MailService {
	// 메일 목록 가져오기
	public List<ReceiveMailDTO> selectByReceiver(int receiver);
}
