package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DietVO {
	private int dno;
	private int uno;
	private String title;
	private String tag;
	private String content;
	private Date regDate;
}
