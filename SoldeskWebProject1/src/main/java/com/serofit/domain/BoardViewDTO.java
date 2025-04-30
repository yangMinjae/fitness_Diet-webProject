package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardViewDTO {
	String title;
	String nickname;
	String tag;
	String content;
	Date regdate;
	int hit;
	int love;
	int uno;
	int bno;
}
