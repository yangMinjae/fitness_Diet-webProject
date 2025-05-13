package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitStrengthDTO extends AbstractSubmitDTO{
	private int strengthStats;
	private int strengthSnacks;
	private int strengthScoops;
	private String liftFocus;
	private int restDays;
}
