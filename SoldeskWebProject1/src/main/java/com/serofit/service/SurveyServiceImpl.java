package com.serofit.service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.MateVO;
import com.serofit.domain.UpdateTagDTO;
import com.serofit.domain.ValTagEnum;
import com.serofit.domain.submitSurvey.AbstractSubmitDTO;
import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.domain.submitSurvey.SubmitGainDTO;
import com.serofit.domain.submitSurvey.SubmitHealthDTO;
import com.serofit.domain.submitSurvey.SubmitMaintainDTO;
import com.serofit.mapper.MateMapper;
import com.serofit.mapper.UProfileMapper;
import com.serofit.other.DietScriptGenerator;
import com.serofit.other.GainScriptGenerator;
import com.serofit.other.HealthScriptGenerator;
import com.serofit.other.MaintainScriptGenerator;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class SurveyServiceImpl implements SurveyService {
	
	@Autowired
	MateMapper mMapper;
	
	@Autowired
	UProfileMapper uMapper;
	
	@Autowired
	AiService aService;

	private static final String ROUTINE = "routine";
	private static final String DIET = "diet";
	private static final String CHEATING_MEAL = "cheatingMeal";
	private static final String ADVICE = "advice";
	
	@Transactional
	@Override
	public boolean updateTbl(AbstractSubmitDTO aDTO) {
		MateVO mVO = new MateVO();
		switch (aDTO.getcDTO().getAge()/10) {
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
		mVO.setArea(aDTO.getcDTO().getArea());
		mVO.setGender(aDTO.getcDTO().isGender());
		mVO.setTime(aDTO.getcDTO().getWorkoutTime());
		mVO.setUno(aDTO.getcDTO().getUno());
		UpdateTagDTO uDTO = new UpdateTagDTO();
		uDTO.setUno(aDTO.getcDTO().getUno());
		uDTO.setTag(ValTagEnum.toLabel(aDTO.getcDTO().getGoal()));
		
		int result1 = mMapper.deleteMate(mVO.getUno());
		int result2 = mMapper.insertMate(mVO);
		int result3 = uMapper.updateTag(uDTO);
		log.warn(mVO);
		log.warn(uDTO);
		System.out.println(result1+result1+result3);
		return result1+result2+result3>=3?true:false;
	}
	
	@Override
	public Map<String,String> makeAiGeneratedData(AbstractSubmitDTO aDTO) {
		Map<String,String> prompts = new LinkedHashMap<String, String>();
		Map<String,String> result = null;
		switch (aDTO.getcDTO().getGoal()) {
		case "다이어트":
			
			DietScriptGenerator dsg = new DietScriptGenerator((SubmitDietDTO)aDTO);
			prompts.put(DIET,dsg.getDietScript());
			prompts.put(ROUTINE,dsg.getRoutineScript());
			prompts.put(CHEATING_MEAL,dsg.getCheatingMealScript());
			prompts.put(ADVICE,dsg.getAdviceScript());
			
			result = requestToApi(prompts);
			break;

		case "멸치 탈출":
			
			GainScriptGenerator gsg = new GainScriptGenerator((SubmitGainDTO)aDTO);
			prompts.put(DIET,gsg.getDietScript());
			prompts.put(ROUTINE,gsg.getRoutineScript());
			prompts.put(ADVICE,gsg.getAdviceScript());
			
			result = requestToApi(prompts);
			break;
			
		case "체중 유지":
			
			MaintainScriptGenerator msg = new MaintainScriptGenerator((SubmitMaintainDTO)aDTO);
			prompts.put(DIET,msg.getDietScript());
			prompts.put(ROUTINE,msg.getRoutineScript());
			prompts.put(ADVICE,msg.getAdviceScript());
			
			result = requestToApi(prompts);
			break;
		case "건강 유지":
			
			HealthScriptGenerator hsg = new HealthScriptGenerator((SubmitHealthDTO)aDTO);
			prompts.put(DIET,hsg.getDietScript());
			prompts.put(ROUTINE,hsg.getRoutineScript());
			prompts.put(ADVICE,hsg.getAdviceScript());
			
			result = requestToApi(prompts);
			break;
			
		case "프로 득근러":
			
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
