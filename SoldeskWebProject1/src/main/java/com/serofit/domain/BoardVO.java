package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class BoardVO {
	private int bno;
	private int dno;
	private int uno;
	private String title;
	private String content;
	private int hit;
	private int love;
	private Date regDate;
	
}
