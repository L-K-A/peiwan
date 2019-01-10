package com.peiwan.Config;

import com.peiwan.component.LoginHandlerInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @description: 拦截配置
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-10 11:09
 **/
@Configuration
public class loginConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**");
        super.addInterceptors(registry);
    }
}
