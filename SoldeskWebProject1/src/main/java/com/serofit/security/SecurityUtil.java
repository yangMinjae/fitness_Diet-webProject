package com.serofit.security;

import com.serofit.domain.UserVO;
import com.serofit.security.domain.CustomUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static UserVO getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.getPrincipal() instanceof CustomUser) {
            CustomUser customUser = (CustomUser) auth.getPrincipal();
            return customUser.getUvo(); // ← 여기서 UserVO 추출
        }

        return null;
    }
}

