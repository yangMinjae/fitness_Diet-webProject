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
	
	private String nickname;
	
	private String fileName;
	private String path;
	
	public MypageProfileDTO(UProfileVO upvo, MateVO mvo, FileVO fvo) {
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
		
		this.fileName=fvo.getFileName();
		this.path=fvo.getPath();
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
	
	public FileVO getFileVO() {
		FileVO fvo = new FileVO();
		fvo.setUuid(uuid);
		fvo.setFileName(fileName);
		fvo.setPath(path);
		return fvo;
	}
}
