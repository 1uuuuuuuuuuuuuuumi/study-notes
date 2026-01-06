package com.lumidaejang.movieapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/api/**")  // /api로 시작하는 모든 경로
                .allowedOrigins("http://localhost:5173")    // React 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용 메서드
                .allowedHeaders("*")    // 모든 헤더 허용
                .allowCredentials(true);    // 쿠키 허용
    }

}
