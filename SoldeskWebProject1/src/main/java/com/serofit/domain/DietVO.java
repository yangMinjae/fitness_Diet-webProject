package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DietVO {
	int dno;
	int uno;
	String title;
	String tag;
	String content;
	Date regDate;
}
