package com.serofit.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.serofit.domain.FileVO;

import lombok.extern.log4j.Log4j;

@Log4j 
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class FileMapperTests {

	@Autowired
	private FileMapper fmapper;
	private int bno;
	
	
	public void TestInsertFile() {
		FileVO fvo = new FileVO();
		fvo.setUuid("UUID-TEST");
		fvo.setBno(6);
		fvo.setFileName("FILENAME_TEST");
		fvo.setPath("PATH_TEST");
		int result = fmapper.insertFile(fvo);
		log.info(result);
	}

	public void TestInsertProfileFile() {
		FileVO fvo = new FileVO();
		fvo.setUuid("UUID_TEST2");
		fvo.setFileName("FILENAME-TEST2");
		fvo.setPath("PATH-TEST2");
		int result = fmapper.insertProfileFile(fvo);
		log.info(result);
	}
	
	public void TestDeleteFile() {
		int result = fmapper.deleteFile(5);
		log.info(result);
	}
	
	public void TestDeleteByUuid() {
		String uuid = "UUID_TEST2";
		int result = fmapper.deleteByUuid(uuid);
		log.info("삭제된 행수" + result);
	}
	
	public void TestSelectUprofileFile() {
		String uuid = "UUID-TEST";  
	    FileVO result = fmapper.selectUprofileFile(uuid);
	    
	    log.info(result);
	}
	@Test
	public void TestSelectBoardFile() {
		int bno =6;  
	    List<FileVO> result = fmapper.selectBoardFile(bno);
	    
	    log.info(result);
	}
	
}
