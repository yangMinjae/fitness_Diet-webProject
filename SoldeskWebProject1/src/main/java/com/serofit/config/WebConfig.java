package com.serofit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 브라우저에서 /profile/으로 시작하면 C:/upload/profile/ 폴더를 찾아감
        registry
            .addResourceHandler("/profile/**")
            .addResourceLocations("file:/C:/upload/profile/");
    }
}
