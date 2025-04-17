package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class FollowVO {
	private int thrower;
	private int catcher;
	private boolean fav;
	
	
}
