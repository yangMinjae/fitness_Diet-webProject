package com.serofit.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.FollowVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class FollowMapperTests {
	@Autowired
	FollowMapper fmapper;
	
	public void testfollow() {
		FollowVO fvo = new FollowVO();
		fvo.setF_er(1);
		fvo.setF_ing(1);
		
		log.info(fmapper.follow(fvo));
	}
	
	public void testaddToFav() {
		FollowVO fvo = new FollowVO();
		fvo.setF_er(1);
		fvo.setF_ing(1);
		
		log.info(fmapper.addToFav(fvo));
	}
	
	public void testremoveFromFav() {
		FollowVO fvo = new FollowVO();
		fvo.setF_er(1);
		fvo.setF_ing(1);
		
		log.info(fmapper.removeFromFav(fvo));
	}	
	
	public void testunfollow() {
		FollowVO fvo = new FollowVO();
		fvo.setF_er(1);
		fvo.setF_ing(1);
		
		log.info(fmapper.unFollow(fvo));
	}
	
	public void testdeleteFollowAll() {		
		log.info(fmapper.deleteFollowAll(1));
	}
}
