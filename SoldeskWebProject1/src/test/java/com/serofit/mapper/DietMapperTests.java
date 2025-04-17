package com.serofit.mapper;

import java.util.Iterator;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.DietVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")

public class DietMapperTests {
	
	@Autowired
	DietMapper dmapper;
	
//	@Test
//	public void getInsertDiet() {
//		DietVO dvo = new DietVO();
//		
//		dvo.setUno(1);
//		dvo.setContent("테스트 컨텐츠");
//		dvo.setTag("테스트 태그");
//		dvo.setTitle("테스트 타이틀");
//		
//		int result = dmapper.insertDiet(dvo);
//		System.out.println("result : " + result);
//	}
	
//	@Test
//	public void getSelectDietByUno() {
//		int uno = 1;
//		
//		List<DietVO> list = dmapper.selectDietByUno(uno);
//		for (DietVO dvo : list) {
//			System.out.println(dvo);
//		}
//	}
	
//	@Test
//	public void getDeleteDietByUno() {
//		int uno = 1;
//		
//		int result = dmapper.deleteDietByUno(uno);
//		System.out.println("result : " + result);
//	}
}
