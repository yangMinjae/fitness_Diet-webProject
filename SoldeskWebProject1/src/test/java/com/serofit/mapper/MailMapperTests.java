package com.serofit.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.MailVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")

public class MailMapperTests {
	
	@Autowired
	MailMapper mMapper;
	
//	@Test
//	public void getInsertMail() {
//		MailVO mmvo = new MailVO();
//		
//		mmvo.setReceiver(1);
//		mmvo.setSender(1);
//		mmvo.setContent("테스트 내용");
//		
//		int result = mMapper.insertMail(mmvo);
//		System.out.println(result);
//	}
	
//	@Test
//	public void getSelectByReceiver() {
//		int receiver = 1;
//		
//		List<MailVO> list = mMapper.selectByReceiver(receiver);
//		for (MailVO mvo : list) {
//			System.out.println(mvo);
//		}
//	}
	
//	@Test
//	public void getDeleteMailByMno() {
//		int result = mMapper.deleteMailByMno(3);
//		
//		System.out.println(result);
//	}
	
//	@Test
//	public void getdeleteMailByUno() {
//		MailVO mvo = new MailVO();
//		
//		mvo.setReceiver(2);
//		mvo.setSender(2);
//		
//		int result = mMapper.deleteMailByUno(mvo);
//		
//		System.out.println(result);
//	}
}
