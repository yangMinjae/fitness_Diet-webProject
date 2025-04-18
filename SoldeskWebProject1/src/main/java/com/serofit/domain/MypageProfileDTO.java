package com.serofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageProfileDTO {
	private String tag;
	private String self;
	private String fav;
	private int uno;
	private int mate;
	private String uuid;
	
	private String time;
	private String area;
	private boolean gender;
	private String age;
	
	public MypageProfileDTO(UProfileVO upvo, MateVO mvo) {
		this.tag=upvo.getTag();
		this.self=upvo.getSelf();
		this.fav=upvo.getFav();
		this.uno=upvo.getUno();
		this.mate=upvo.getMate();
		this.uuid=upvo.getUuid();
		
		this.time=mvo.getTime();
		this.area=mvo.getArea();
		this.gender=mvo.isGender();
		this.age=mvo.getAge();
	}
	
	public UProfileVO getUProfileVO() {
		UProfileVO upvo = new UProfileVO();
		upvo.setFav(fav);
		upvo.setMate(mate);
		upvo.setSelf(self);
		upvo.setTag(tag);
		upvo.setUno(uno);
		upvo.setUuid(uuid);
		
		return upvo;
	}
	
	public MateVO getMateVO() {
		MateVO mvo = new MateVO();
		mvo.setAge(age);
		mvo.setArea(area);
		mvo.setGender(gender);
		mvo.setTime(time);
		mvo.setUno(uno);
		
		return mvo;
	}
}
