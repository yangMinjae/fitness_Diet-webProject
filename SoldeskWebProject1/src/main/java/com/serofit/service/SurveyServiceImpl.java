package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.MateVO;
import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.mapper.MateMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class SurveyServiceImpl implements SurveyService {
	
	@Autowired
	MateMapper mMapper;

	@Transactional
	@Override
	public boolean updateMateTbl(SubmitDietDTO dDto) {
		MateVO mVO = new MateVO();
		switch (dDto.getCDTO().getAge()/10) {
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
		mVO.setArea(dDto.getCDTO().getArea());
		mVO.setGender(dDto.getCDTO().isGender());
		mVO.setTime(dDto.getCDTO().getWorkoutTime());
		mVO.setUno(dDto.getCDTO().getUno());
		log.warn(mVO);
		int result1 = mMapper.deleteMate(mVO.getUno());
		int result2 = mMapper.insertMate(mVO);
		return result1+result2>=2?true:false;
	}
	
	@Override
	public String makeScript(String goal, String type, SubmitDietDTO dDto) {
		if(goal=="diet") {
			
		}
		return null;
	}
	
	@Override
	public String getResultFromAI(String prompt) {
		// TODO Auto-generated method stub
		return null;
	}

}
