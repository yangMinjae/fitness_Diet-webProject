package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.domain.FileVO;
import com.serofit.domain.FollowMailDTO;
import com.serofit.domain.FollowVO;
import com.serofit.domain.HotBoardDTO;
import com.serofit.domain.MailVO;
import com.serofit.domain.ReceiveMailDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.FileMapper;
import com.serofit.mapper.FollowMapper;
import com.serofit.mapper.MailMapper;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MailServiceImple implements MailService {
	@Autowired
	MailMapper mMapper;
	
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	BoardMapper bMapper;
	
	@Autowired
	FileMapper fMapper;
	
	@Autowired
	UProfileMapper upMapper;
	
	@Autowired
	DietMapper dMapper;	
	
	@Autowired
	FollowMapper folMapper;

	@Override
	public List<ReceiveMailDTO> selectByReceiver(int receiver) {
		// DTOList
		List<ReceiveMailDTO> rmList = new ArrayList<ReceiveMailDTO>();

		// 받은 메일 가져오기
		List<MailVO> mList = mMapper.selectByReceiver(receiver);

		for (MailVO mvo : mList) {
			// DTO 생성
			ReceiveMailDTO rmDTO = new ReceiveMailDTO();
			// Uno 통해서 Uuid 가져 온 후 FilePath 생성
			UProfileVO upVO = upMapper.selectByUno(mvo.getSender());
			FileVO fVO = fMapper.selectUprofileFile(upVO.getUuid());
			rmDTO.setImgPath(fVO.getUuid() + fVO.getFileName() + fVO.getPath());

			// DTO에 변수 설정
			rmDTO.setNickname(uMapper.readNickname(mvo.getSender()));
			rmDTO.setContent(mvo.getContent());
			rmDTO.setRegdate(mvo.getRegdate());
			rmList.add(rmDTO);
		}
		
		return rmList;
	}
	
	@Override
	public List<FollowMailDTO> getFollowList(int uno) {	
		// DTOList
		List<FollowMailDTO> rmList = new ArrayList<FollowMailDTO>();
		
		for (FollowVO fvo : folMapper.getFollowList(uno)) {
			// DTO 생성
			FollowMailDTO fmDTO = new FollowMailDTO();
			
			// Uno 통해서 Uuid 가져 온 후 FilePath 생성
			UProfileVO upVO = upMapper.selectByUno(fvo.getCatcher());
			FileVO fVO = fMapper.selectUprofileFile(upVO.getUuid());
			fmDTO.setImgPath(fVO.getUuid() + fVO.getFileName() + fVO.getPath());

			// DTO에 변수 설정
			fmDTO.setNickname(uMapper.readNickname(fvo.getCatcher()));
			fmDTO.setReceiver(fvo.getCatcher());
			rmList.add(fmDTO);
		}
		
		return rmList;
	}
	
	@Override
	public int insertMail(MailVO mvo) {		
		return mMapper.insertMail(mvo);
	}
}
