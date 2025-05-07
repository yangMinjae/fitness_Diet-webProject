package com.serofit.other;

import java.util.HashMap;
import java.util.Map;

import com.serofit.domain.submitSurvey.SubmitCommonDTO;
import com.serofit.domain.submitSurvey.SubmitDietDTO;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DietUtilCalculator {
	private static Map<String, String> ratioMap = new HashMap<String, String>();
	static{
	ratioMap.put("저탄고지", "5:25:70");
	ratioMap.put("칼로리 제한", "40:30:30");
	ratioMap.put("고단백식단", "35:40:25");
	ratioMap.put("멸치 탈출", "50:25:25");
	ratioMap.put("유지어터","40:30:30");
	ratioMap.put("헬스키퍼","40:30:30");
	ratioMap.put("스트렝스", "45:30:25");
	ratioMap.put("근성장", "50:25:25");
	}
	
	private int totalCal;
	
	public int getTotalCal() {
		return totalCal;
	}
	
	public void setTotalCalNormalCase(SubmitCommonDTO cDTO, int dietGoal) {
		double bmr = cDTO.isGender()?
				66.5+(13.75*cDTO.getWeight())+(5.003*cDTO.getHeight())-(6.755*cDTO.getAge()) :
					655.1+(9.563*cDTO.getWeight())+(1.850*cDTO.getHeight())-(4.676*cDTO.getAge());
				
	}
	public void setTotalCalExpert() {
		
	}
	
	private double[] getIntRatio(String param) {
		String[] ratio = ratioMap.get(param).split(":");
		double[] result = new double[3];
		for (int i = 0; i < result.length; i++) {
			result[i] = Double.parseDouble(ratio[i])/100.0;
		}
		return result;
	}
	public String[] getNutrientsGram(String param) {
		return null;
	}
}
