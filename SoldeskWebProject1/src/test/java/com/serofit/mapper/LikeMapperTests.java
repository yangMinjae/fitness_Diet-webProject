package com.serofit.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.LikeVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class LikeMapperTests {
	
	@Autowired
	LikeMapper lmapper;
	
	@Test
//	public void findBnoByUnoTest(){
//		List<LikeVO> lvo = lmapper.findBnoByUno(1);
//		log.info("findBnoByUno");
//	}

//	public void deleteByBnoAndUnoTest() {
//		LikeVO lvo = new LikeVO(1,1);
//		int result = lmapper.deleteByBnoAndUno(lvo);
//		log.info("deleteBnoByBnoAndUno......"+result);
//	}

//	public void insertByBnoAndUnoTest() {
//		for (int i = 30; i < 50; i++) {
//			for (int j = 50; j > 30; j--) {
//				LikeVO lvo = new LikeVO(i,j);
//				lmapper.insertByBnoAndUno(lvo);
//				log.info("insertByBnoAndUnoTest...........("+i+", "+j+")");
//			}
//		}
//	}
		
//	public void deleteByBnoTest() {
//		for (int i = 0; i < 50; i++) {
//			lmapper.deleteByBno(50-i);
//			log.info("deleteByBnoTest...........("+i+")");
//		}
//	}
	
	public void deleteByUnoTest(){
		int result = lmapper.deleteByUno(1);
		log.info("deleteByUnoTest...........("+result+")");
	}
}
