package com.serofit.service;

import com.serofit.domain.submitSurvey.SubmitDietDTO;

public interface SurveyService {
	public boolean updateMateTbl(SubmitDietDTO dDto);
	public String makeScript(String goal, String type, SubmitDietDTO dDto);
	public String getResultFromAI(String prompt);
}
