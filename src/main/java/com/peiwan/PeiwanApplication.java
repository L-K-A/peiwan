package com.peiwan;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

import javax.servlet.MultipartConfigElement;
=======
>>>>>>> 62f535f901c014b9188b44f6c4b3b6f12f87f396

@MapperScan("com.peiwan.dao")
@SpringBootApplication
public class PeiwanApplication {

    public static void main(String[] args) { SpringApplication.run(PeiwanApplication.class, args); }
    /*@Bean
    MultipartConfigElement multipartConfigElement(){
        MultipartConfigFactory factory=new MultipartConfigFactory();
        factory.setLocation("");
    }*/
}

