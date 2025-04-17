package com.serofit.mapper;

import java.util.List;

import com.serofit.domain.FileVO;

public interface FileMapper {	
	// 이미지 업로드, 수정
	public int insertFile(FileVO fvo);
	
	// 프로필 사진 등록
	public int insertProfileFile(FileVO fvo);
	
	// 이미지 삭제
	public int deleteFile(int bno);
	
	// uuid 파일삭제
	public int deleteByUuid(String uuid);
	
	// 프로필 이미지 띄우기
	public FileVO selectUprofileFile(String uuid);
	
	// 게시물에서 이미지 띄우기
	public List<FileVO> selectBoardFile(int bno);

}
