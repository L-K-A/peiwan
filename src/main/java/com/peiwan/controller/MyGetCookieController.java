package com.peiwan.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * @description: 登录成功后生成一串字符作为ticket存储在数据库和cookie中，用于下次登录的免密码登录验证。一段时间后数据库中的ticket失效，用户需要重新登录
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-08 14:53
 **/
@RestController
public class MyGetCookieController {

//    首先，想要获取Cookie信息，那么就得先有Cookie信息，这边我们自己从头开始，先弄个Cookie吧

    @RequestMapping("/getCookies")
    public String setCookies(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();
        if (cookies !=null){
            for (Cookie cookie:cookies){
                if (cookie.getName().equals("sessionId")){
                    return cookie.getValue();
                }
            }
        }

        return null;
    }


}
