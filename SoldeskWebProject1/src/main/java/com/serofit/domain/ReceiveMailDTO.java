package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReceiveMailDTO {
	private int uno;
	private String nickname;
	private Date regdate;
	private String content;
	private String preview;
	private String imgPath;
	private int mno;
	private int hit;
}
