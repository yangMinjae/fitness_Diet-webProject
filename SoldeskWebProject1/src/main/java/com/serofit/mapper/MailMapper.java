package com.serofit.mapper;

import java.util.List;
import com.serofit.domain.MailVO;

public interface MailMapper {
	
	// 받은 사람 기준으로 메일 불러오기
	public List<MailVO> selectByReceiver(int receiver);
	
	// 보낸 사람 기준으로 메일 불러오기
	public List<MailVO> selectBySender(int sender);
	
	// 메일 보내기
	public int insertMail(MailVO mvo);
	
	// MNO로 메일 삭제
	public int deleteMailByMno(int mno); 
	
	// 탈퇴 시 메일 전체 삭제
	public int deleteMailByUno(MailVO mvo); 
	
	// 메일 갯수 가져오기
	public int selectMailCountByReceiver(int receiver);
	
	// 메일 확인 시 update
	public int updateByReadMail(int mno);
}
