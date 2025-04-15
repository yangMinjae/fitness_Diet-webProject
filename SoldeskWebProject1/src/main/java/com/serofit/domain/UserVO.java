package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
public class UserVO {
	private int uno;
	private String id;
	private String pw;
	private String nickname;
	private String email;
}
