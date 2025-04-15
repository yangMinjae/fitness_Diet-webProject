package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MateVO {
	private int uno;
	private boolean gender;
	private String time;
	private String area;
	private String age;
}
