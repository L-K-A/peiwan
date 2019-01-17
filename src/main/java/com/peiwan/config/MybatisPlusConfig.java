package com.peiwan.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @program: peiwan
 * @description: 分页插件
 * @author: 张帅东
 * @create: 2019-01-09 19:13
 **/
@Configuration
@MapperScan("com.peiwan.dao")
public class MybatisPlusConfig {
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        return new PaginationInterceptor();
    }
}
