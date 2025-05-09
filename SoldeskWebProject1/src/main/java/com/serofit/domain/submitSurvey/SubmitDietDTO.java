package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitDietDTO extends AbstractSubmitDTO{
	private int dietGoal;
	private String dietType;
	private String appetiteControl;
	private String dietDifficulties;
}
