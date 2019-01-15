package com.peiwan.Utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class ImagScancer implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/imgupload/**").addResourceLocations("classpath:/static/imgupload/");
        registry.addResourceHandler("/static/**").addResourceLocations("file:/C:/Users/Administrator/Desktop/peiwan/src/main/resources/static/imgupload/");
    }
}
