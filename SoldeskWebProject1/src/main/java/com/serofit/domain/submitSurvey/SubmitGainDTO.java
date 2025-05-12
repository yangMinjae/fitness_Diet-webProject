package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitGainDTO extends AbstractSubmitDTO{
	private int gainGoal;
	private String gainExperience;
	private int gainSnacks;
	private String gainDifficulties;
}
