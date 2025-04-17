package com.serofit.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.BoardVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class BoardMapperTests {
	@Autowired
	BoardMapper bmapper;
	
	@Test
//	public void getPostByBnoTest() {
//		BoardVO bvo;
//		bvo = bmapper.getPostByBno(1);
//		log.info("getPostByBno..."+bvo);
//		log.info("getPostByBno..."+bvo.getTitle());
//	}
	
//	public void getPostListTest() {
//		List<BoardVO> list = bmapper.getPostList();
//		for (BoardVO bvo : list) {
//			log.info("getPostLIstTest........"+bvo);
//		}
//	}
	
//	public void getHotPostsTest() {
//		List<BoardVO> list = bmapper.getHotPosts(5);
//		for (BoardVO bvo : list) {
//			log.info("getPostLIstTest........"+bvo);
//		}
//	}
	
//	public void updateHitTest() {
//		int result=0;
//		for (int i = 0; i < 20; i++) {
//			result = bmapper.updateHit(9);			
//		}
//		log.info("result......" + result);
//	}
	
//	public void updateLikeTest() {
//		int result=0;
//		result = bmapper.updateLike(9, +22);			
//		log.info("result......" + result);
//	}
	
//	public void deletePostByBnoTest() {
//		int result=0;
//		result = bmapper.deletePostByBno(2);			
//		log.info("result......" + result);
//	}
	
	public void deletePostByUnoTest() {
		int result=0;
		result = bmapper.deletePostByUno(2);			
		log.info("result......" + result);
	}
}
