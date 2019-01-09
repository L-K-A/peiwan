package com.peiwan.configs;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @Author: zhangwanli
 * @Despriction:  MP提供的配置拦截器
 * @Date:Created in 16:24 2019/1/7
 * @Modify by:
 */
@EnableTransactionManagement
@Configuration
@MapperScan("com.peiwan.dao")
public class MybatisplusConfig {
    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
