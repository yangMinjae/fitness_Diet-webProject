package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
public class SubmitMuscleDTO extends AbstractSubmitDTO{
	
	private String muscleType;
	
	{
		this.setSurplus(250);
	}
	
	public String getMuscleType() {
		return muscleType;
	}

	public void setMuscleType(String muscleType) {
		this.muscleType = muscleType;
		this.setnOrsScript("원하는 체형은 피지크 체형, 보디빌더 체형중 "+muscleType+"이야");
	}
	
	
}
