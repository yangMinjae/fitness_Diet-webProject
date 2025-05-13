package com.serofit.security.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.serofit.domain.UserVO;

import lombok.Getter;

@Getter
public class CustomUser extends User{
	
	private UserVO uvo;
	private int mailCount;

	 public CustomUser() {
	        super("anonymous", "anonymous", new ArrayList<>());
	 }
	
	public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}
	
	public CustomUser(UserVO uvo, int mailCount) {
		super(uvo.getId(),
				uvo.getPw(),
				uvo.getAuthList()
				.stream()
				.map(auth->
				new SimpleGrantedAuthority(auth.getAuth())
				)
				.collect(Collectors.toList())
				);
		this.uvo = uvo;
		this.mailCount = mailCount;
	}
	
	public int getUno() {
		return this.uvo.getUno();
	}
	
	public String getNickname() {
		return this.uvo.getNickname();
	}
	
	public int getMailCount() {
		return this.mailCount;
	}
}