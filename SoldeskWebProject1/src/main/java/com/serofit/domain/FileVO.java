package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileVO {
	private String uuid;
	private int bno;
	private String fileName;
	private String path;
	
	public FileVO(String path, String uuid, String fileName) {
		this.uuid = uuid;
		this.fileName = fileName;
		this.path = path;
	}
	
	
}
