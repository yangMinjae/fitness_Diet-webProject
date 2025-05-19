package com.serofit.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileModalDTO {
	private FileVO fvo;
	private UProfileVO upvo;
	private List<BoardVO> bList;
	private String nickname;
	private int uno;
	private int fCount;	
}
