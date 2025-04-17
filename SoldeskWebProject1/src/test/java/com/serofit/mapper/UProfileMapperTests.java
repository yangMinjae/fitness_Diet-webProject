package com.serofit.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.UProfileVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")

public class UProfileMapperTests {

	@Autowired
	UProfileMapper uMapper;
	
//	@Test
//	public void getInsertProfile() {
//		UProfileVO upvo = new UProfileVO();
//		
//		upvo.setUno(1);	
//		upvo.setUuid("UUID-TEST");
//		
//		int result = uMapper.insertProfile(upvo);
//	}
	
//	public void getSelectByUno() {
//		int uno = 1;
//		
//		UProfileVO list = uMapper.selectByUno(uno);
//		
//		System.out.println(list);
//		
//	}
	
//	public void getUpdateProfile() {
//		UProfileVO upvo = new UProfileVO();
//		
//		upvo.setUuid("UUID-TEST");
//		upvo.setMate(0);
//		upvo.setSelf("안녕하세요");
//		upvo.setFav("배드민턴");
//		upvo.setUno(1);
//		upvo.setTag("다이어터");
//		
//		int result = uMapper.updateProfile(upvo);
//		
//		System.out.println(result);
//	}
	
//	public void getDeleteProfile() {
//		int uno = 1;
//		
//		uMapper.deleteProfile(uno);
//	}
	
}
