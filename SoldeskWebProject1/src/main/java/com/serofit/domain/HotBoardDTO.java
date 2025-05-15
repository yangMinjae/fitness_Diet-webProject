package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HotBoardDTO {
	String title;
	Date regdate;
	String tag;
	String imgPath;
	String nickname;
	int bno;
}
