package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardListDTO {
	
	String title;
	String nickname;
	String tag;
	Date regdate;
	int hit;
	int love;
}
