package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitMaintainDTO extends AbstractSubmitDTO{
	private String outFood;
	private String otherFood;
	private String notFood;
	private String challenge;
}
