package com.serofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReceiveMailDTO {
	String nickname;
	Date regdate;
	String content;
	String imgPath;
}
