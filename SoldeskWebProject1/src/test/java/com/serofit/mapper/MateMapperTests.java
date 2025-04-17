package com.serofit.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.MateVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class MateMapperTests {
	@Autowired
	MateMapper mMapper;
	
	public void testinsertMate() {
		MateVO mvo = new MateVO();
		mvo.setUno(1);
		mvo.setAge("age");
		mvo.setArea("area");
		mvo.setGender(false);
		mvo.setTime("time");
		
		log.info(mMapper.insertMate(mvo));
	}
	
	public void testfindMate() {
		log.info(mMapper.findMate(1));
	}
	
	public void testdeleteMate() {
		log.info(mMapper.deleteMate(1));
	}
}
