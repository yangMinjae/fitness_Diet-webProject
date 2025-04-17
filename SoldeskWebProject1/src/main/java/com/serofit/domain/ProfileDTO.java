package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

// 닉네임과 프로필 사진을 전달하는 dto
@Data
@AllArgsConstructor
public class ProfileDTO {
	private String nickname;
	private FileVO fvo;
}
