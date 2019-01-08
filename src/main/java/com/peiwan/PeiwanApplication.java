package com.peiwan;

import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ImportResource;

@MapperScan("com.peiwan.dao")
@SpringBootApplication
//       启动动扫描（验证码的配置文件）   张家明添加
@ImportResource(locations={"classpath:mykaptcha.xml"})

public class PeiwanApplication {

    public static void main(String[] args) {
        SpringApplication.run(PeiwanApplication.class, args);





    }

}

