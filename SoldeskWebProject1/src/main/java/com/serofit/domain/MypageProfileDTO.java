package com.serofit.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class MypageProfileDTO {
	@JsonProperty("uVO")
	private UserVO uVO=null;
	
	@JsonProperty("upVO")
	private UProfileVO upVO=null;
	
	@JsonProperty("mVO")
	private MateVO mVO=null;
	
	@JsonProperty("fVO")
	private FileVO fVO=null;
	
	public MypageProfileDTO() {
		initMpDTO();
	}
	
	public void initMpDTO() {
		if(uVO==null) {
			this.uVO= new UserVO();			
		}
		if(upVO==null) {
			this.upVO = new UProfileVO();			
		}
		if(mVO==null) {
			this.mVO = new MateVO();
			
		}
		if(fVO==null) {			
			this.fVO = new FileVO();
		}
		uniformlySet();
	}
	
	public void uniformlySet() {
		if(uVO.getUno()!=0) {
			this.upVO.setUno(uVO.getUno());
			this.mVO.setUno(uVO.getUno());			
		}
		if(fVO.getUuid()!=null) {
			this.upVO.setUuid(fVO.getUuid());			
		}
		if(upVO.getUuid()!=null) {
			this.fVO.setUuid(upVO.getUuid());
		}
	}
}
