package com.serofit.other;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.serofit.domain.submitSurvey.AbstractSubmitDTO;
import com.serofit.domain.submitSurvey.SubmitCommonDTO;
import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.domain.submitSurvey.SubmitMuscleDTO;
import com.serofit.domain.submitSurvey.SubmitStrengthDTO;

import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@NoArgsConstructor
public class DietUtilCalculator {
	private static Map<String, String> ratioMap = new HashMap<String, String>();
	static{
	ratioMap.put("저탄고지", "5:25:70");
	ratioMap.put("칼로리 제한", "40:30:30");
	ratioMap.put("고단백식단", "35:40:25");
	ratioMap.put("멸치 탈출", "50:25:25");
	ratioMap.put("체중 유지","40:30:30");
	ratioMap.put("건강 유지","40:30:30");
	ratioMap.put("스트렝스 강화", "45:30:25");
	ratioMap.put("근육 성장", "50:25:25");
	}
	
	private int totalCal=0;
	
	public int getTotalCal() {
		return totalCal;
	}
	
	public void setTotalCalNormalCase(SubmitCommonDTO cDTO, int dietGoal) {
		dietGoal = cDTO.getGoal().equals("다이어트")?dietGoal*(-1):dietGoal;
		double bmr = cDTO.isGender()
			    ? 88.362 + (13.397 * cDTO.getWeight()) + (4.799 * cDTO.getHeight()) - (5.677 * cDTO.getAge())
			    : 447.593 + (9.247 * cDTO.getWeight()) + (3.098 * cDTO.getHeight()) - (4.330 * cDTO.getAge());
		this.totalCal = (int)(bmr*cDTO.getActivityLevel()+dietGoal*256.67);	
		log.warn(totalCal);
	}
	public void setTotalCalExpert(AbstractSubmitDTO aDTO) {
		int dietSurplus=aDTO.getSurplus();
		double bmr = aDTO.getcDTO().getWeight()*(1-aDTO.getcDTO().getFatRatio()/100.0)*21.6+370;
		this.totalCal = (int)(bmr*aDTO.getcDTO().getActivityLevel()+dietSurplus);
	}
	
	private double[] getDoubleRatio(String param) {
		String[] ratio = ratioMap.get(param).split(":");
		double[] result = new double[3];
		for (int i = 0; i < result.length; i++) {
			result[i] = Double.parseDouble(ratio[i])/100.0;
		}
		return result;
	}
	public String[] getNutrientsGram(String param) {
		// 탄단지 비율에 따라 탄단지 그램수를 반환한다.
		// 매개변수로는 저탄고지, 고단백 식단등 탄단지 비율에 영향을 주는 타입 이름을 문자열로 받는다.
		double[] ratio = getDoubleRatio(param);
		String[] result = new String[3];
		for (int i = 0; i < result.length; i++) {
			if(i==2) {
				result[i]=(int)(totalCal*ratio[i]/9)+"";
			}else {
				result[i]=(int)(totalCal*ratio[i]/4)+"";
			}
		}
		return result;
	}
	public String[] getNutrientsGram(AbstractSubmitDTO aDTO) {
		// 탄단지 비율에 따라 탄단지 그램수를 반환한다.
		// 매개변수로는 저탄고지, 고단백 식단등 탄단지 비율에 영향을 주는 타입 이름을 문자열로 받는다.
		double[] ratio = getDoubleRatio(aDTO.getcDTO().getNGoal());
		int nOfScoops = aDTO.getcDTO().getNOfScoops();
		String[] result = new String[3];
		for (int i = 0; i < result.length; i++) {
			if(i==2) {
				result[i]=(int)(totalCal*ratio[i]/9-2*nOfScoops)+"";
			}else if(i==0){
				result[i]=(int)(totalCal*ratio[i]/4-2*nOfScoops)+"";
			}else {
				result[i]=(int)(totalCal*ratio[i]/4-22*nOfScoops)+"";				
			}
		}
	
		return result;
	}
}
