package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileVO {
	String uuid;
	int bno;
	String fileName;
	String path;
}
