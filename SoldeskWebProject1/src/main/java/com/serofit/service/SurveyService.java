package com.serofit.service;

import java.util.Map;

import com.serofit.domain.submitSurvey.AbstractSubmitDTO;

public interface SurveyService {
	public boolean updateMateTbl(AbstractSubmitDTO aDTO);
	public Map<String, String> makeAiGeneratedData(AbstractSubmitDTO aDTO);
	public Map<String,String> requestToApi(Map<String, String> prompts);
}
