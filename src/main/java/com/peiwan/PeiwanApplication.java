package com.peiwan;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

import javax.servlet.MultipartConfigElement;

=======
import org.springframework.context.annotation.Bean;

>>>>>>> 5cadebb7e07cd613289802de774e68e93c34234a
@MapperScan("com.peiwan.dao")
@SpringBootApplication
public class PeiwanApplication {

<<<<<<< HEAD
    public static void main(String[] args) { SpringApplication.run(PeiwanApplication.class, args); }
    /*@Bean
    MultipartConfigElement multipartConfigElement(){
        MultipartConfigFactory factory=new MultipartConfigFactory();
        factory.setLocation("");
    }*/
=======
    public static void main(String[] args) {
        SpringApplication.run(PeiwanApplication.class, args);
    }



>>>>>>> 5cadebb7e07cd613289802de774e68e93c34234a
}

