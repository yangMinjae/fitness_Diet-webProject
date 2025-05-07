package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitDietDTO {
	private SubmitCommonDTO cDTO;
	private int dietGoal;
	private String dietType;
	private String appetiteControl;
	private String dietDifficulties;
}
