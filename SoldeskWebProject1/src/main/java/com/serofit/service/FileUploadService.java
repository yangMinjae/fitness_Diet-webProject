package com.serofit.service;

import org.springframework.web.multipart.MultipartFile;

import com.serofit.domain.MypageProfileDTO;

public interface FileUploadService {
	
	// 파일 업로드
	public void uploadFile(MultipartFile uploadFile, MypageProfileDTO mpDTO);
	
}
