package com.serofit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.MateVO;
import com.serofit.domain.submitSurvey.AbstractSubmitDTO;
import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.mapper.MateMapper;
import com.serofit.other.DietScriptGenerator;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class SurveyServiceImpl implements SurveyService {
	
	@Autowired
	MateMapper mMapper;
	
	@Autowired
	AiService aService;

	private static final String routineC = "routine";
	private static final String dietC = "diet";
	private static final String cheatingMealC = "cheatingMeal";
	private static final String adviceC = "advice";
	
	@Transactional
	@Override
	public boolean updateMateTbl(AbstractSubmitDTO aDTO) {
		MateVO mVO = new MateVO();
		switch (aDTO.getCDTO().getAge()/10) {
		case 1:
			mVO.setAge("10대");
			break;
		case 2:
			mVO.setAge("20대");
			break;
		case 3:
			mVO.setAge("30대");
			break;
		default:
			mVO.setAge("40대 이상");
			break;
		}
		mVO.setArea(aDTO.getCDTO().getArea());
		mVO.setGender(aDTO.getCDTO().isGender());
		mVO.setTime(aDTO.getCDTO().getWorkoutTime());
		mVO.setUno(aDTO.getCDTO().getUno());
		log.warn(mVO);
		int result1 = mMapper.deleteMate(mVO.getUno());
		int result2 = mMapper.insertMate(mVO);
		return result1+result2>=2?true:false;
	}
	
	@Override
	public Map<String,String> makeAiGeneratedData(AbstractSubmitDTO aDTO) {
		Map<String,String> prompts = new LinkedHashMap<String, String>();
		Map<String,String> result = null;
		switch (aDTO.getCDTO().getGoal()) {
		case "다이어트":
			
			DietScriptGenerator dsg = new DietScriptGenerator((SubmitDietDTO)aDTO);
			prompts.put(dietC,dsg.getDietScript());
			prompts.put(routineC,dsg.getRoutineScript());
			prompts.put(cheatingMealC,dsg.getCheatingMealScript());
			prompts.put(adviceC,dsg.getAdviceScript());
			
			result = requestToApi(prompts);
			break;

		case "멸치탈출":
			
			break;
			
		case "건강유지":
			
			break;
			
		case "체중유지":
			
			break;
		
		case "스트렝스 강화":
			
			break;
			
		case "근육 성장":
			
			break;
		}
		return result;
	}
	
	@Override
	public Map<String, String> requestToApi(Map<String,String> prompts) {
		Map<String,String> result = new LinkedHashMap<String, String>();
		
		for (String key : prompts.keySet()) {
			result.put(key,aService.getResult(prompts.get(key)));
		}
		
		return result;
	}

}
