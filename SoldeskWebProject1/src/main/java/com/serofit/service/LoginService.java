package com.serofit.service;

import com.serofit.domain.LoginDTO;
import com.serofit.domain.UserVO;

public interface LoginService {
	public String login(LoginDTO ldto);
	
	public UserVO findID(String email);
}
