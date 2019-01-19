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
>>>>>>> 9fb37ab764f9d72d5831f5bcbec6d7e6ae795c6e
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

