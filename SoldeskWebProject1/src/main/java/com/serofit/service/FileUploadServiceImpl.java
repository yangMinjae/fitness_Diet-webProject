package com.serofit.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.serofit.domain.FileVO;
import com.serofit.domain.MypageProfileDTO;
import com.serofit.mapper.FileMapper;
import com.serofit.mapper.UProfileMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class FileUploadServiceImpl implements FileUploadService{
	
	@Autowired
	FileMapper fMapper;
	
	@Autowired
	UProfileMapper upMapper;
	
	@Transactional
	@Override
	public void uploadFile(MultipartFile uploadFile, MypageProfileDTO mpDTO) {

		mpDTO.initMpDTO();
		
		String oUuid = mpDTO.getFVO().getUuid();
		FileVO fVO = fMapper.selectUprofileFile(oUuid);
		String oPath = fVO.getPath();
		String oFileName = fVO.getFileName();
		
		String oFullFilePath = oPath+"\\"+oUuid+"_"+oFileName;
		
		if(!mpDTO.getBasicImg().equals("")) {	// 기본 이미지 중 하나 선택했을 경우
			mpDTO.getFVO().setUuid(mpDTO.getBasicImg());	
			upMapper.updateUUID(mpDTO.getFVO().getUuid(),mpDTO.getUVO().getUno());
		}
		if(!uploadFile.isEmpty()) {			// 직접 업로드 했을 경우
			// 파일 시스템에 파일 만드는 작업
			String nUuid = UUID.randomUUID().toString();
			String nPath = "Z:\\upload\\profile";
			String nFileName = uploadFile.getOriginalFilename();
			
			String nFullFilePath = nPath+"\\"+nUuid+"_"+nFileName;

			
			try {	
				File folder = new File(nPath);
				if (!folder.exists()) {
				    folder.mkdirs();
				}
				
				File saveFile = new File(nFullFilePath);
				if (saveFile.exists()) {
				    throw new IllegalStateException("파일 중복 발생: " + nFullFilePath);
				}
				
				uploadFile.transferTo(saveFile);
				
				try {
					fMapper.insertProfileFile(new FileVO(nPath, nUuid, nFileName));	
					upMapper.updateUUID(nUuid, mpDTO.getUVO().getUno());
				} catch (Exception dbException) {
					if(saveFile.exists()) {
						if(!saveFile.delete()) {
							log.error("DB 쿼리 수행 문제로 파일 삭제를 시도했으나 실패했습니다.");
						}
					}
					throw dbException;
				}
			} catch (IllegalStateException | IOException e) {
				log.error("파일 업로드 중 오류:"+e.getMessage());
			} catch (Exception e) {
				log.error("DB 업로드 실패 : "+e.getMessage());
			}

		}
		System.out.println(oFullFilePath);
		if(!oUuid.contains("basic")) {
			System.out.println("?????");
			File existingFile = new File(oFullFilePath);
			if(existingFile.exists()) {
				if(!existingFile.delete()) {
					log.error("기존의(변경 전) 프로필 사진 삭제를 실패했습니다.");
				}
			}
			fMapper.deleteByUuid(oUuid);
		}
	}
}
