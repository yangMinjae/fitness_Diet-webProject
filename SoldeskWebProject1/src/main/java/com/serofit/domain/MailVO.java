package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class MailVO {
	private int mno;
	private int receiver;
	private int sender;
	private String content;
	private Date regdate;
	private int hit;
}
