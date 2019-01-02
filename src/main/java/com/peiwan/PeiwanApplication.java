package com.peiwan;

import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
@MapperScan("com.peiwan.dao")
@SpringBootApplication
public class PeiwanApplication {

    public static void main(String[] args) {
        SpringApplication.run(PeiwanApplication.class, args);
    }

}

