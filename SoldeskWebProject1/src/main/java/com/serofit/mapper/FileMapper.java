package com.serofit.mapper;

import com.serofit.domain.FileVO;

public interface FileMapper {

	
	// 이미지 업로드, 수정
	public int insertFile(FileVO fvo);
	// 이미지 삭제
	public int deleteFile(int bno);
}
