package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FollowMailDTO {
	int receiver;
	String nickname;
	String imgPath;
}
