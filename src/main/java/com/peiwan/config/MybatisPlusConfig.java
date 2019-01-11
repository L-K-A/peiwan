package com.peiwan.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author Zhou先生
 * @date 2019/1/9 10:56
 */


@EnableTransactionManagement
@Configuration
@MapperScan("com.peiwan.dao")
public class MybatisPlusConfig {

    /*分页插件*/
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        return new PaginationInterceptor();
    }
}
