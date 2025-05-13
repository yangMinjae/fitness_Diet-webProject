package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitHealthDTO extends AbstractSubmitDTO{
	
	private String[] diseases;
	private String alcohol;
	private double smoking;
	private String sleep;
}
