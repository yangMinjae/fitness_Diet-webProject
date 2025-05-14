package com.serofit.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// 닉네임과 프로필 사진을 전달하는 dto
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MateDTO {
	
	private UProfileVO pvo;
	private ProfileDTO dto;
	private MateVO mvo;
	private int checker;
}
