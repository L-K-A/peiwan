package com.peiwan;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@MapperScan("com.peiwan.dao")
@SpringBootApplication
public class PeiwanApplication {


    public static void main(String[] args) { SpringApplication.run(PeiwanApplication.class, args); }

}

