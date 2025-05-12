package com.serofit.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
	private int uno;
	private String id;
	private String pw;
	private String nickname;
	private String email;
	
	private List<AuthVO> authList;
}
