package com.serofit.domain.submitSurvey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
public class SubmitStrengthDTO extends AbstractSubmitDTO{
	private String liftFocus;
	private int restDays;
	{
		this.setSurplus(150);
	}
	public String getLiftFocus() {
		return liftFocus;
	}
	public void setLiftFocus(String liftFocus) {
		this.liftFocus = liftFocus;
		this.setnOrsScript("벤치프레스, 스쿼트, 데드리프트 중 강화하고자 하는 종목은 "+liftFocus+"야");
	}
	public int getRestDays() {
		return restDays;
	}
	public void setRestDays(int restDays) {
		this.restDays = restDays;
	}
	
}
