package com.peiwan.controller;


import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;

/**
 * @description: 校验验证码是否正确  （异步实现）
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-08 16:42
 **/

@Controller
public class KaptchaController {

    private static  final transient Logger log = Logger.getLogger(KaptchaController.class);

    @RequestMapping(value = "kaptcha", method = RequestMethod.POST)
    @ResponseBody
    public String loginCheck(HttpServletRequest request,
//	            @RequestParam(value = "username", required = true) String username,
//	            @RequestParam(value = "password", required = true) String password,
                             @RequestParam(value = "kaptcha", required = true) String kaptchaReceived){
        //用户输入的验证码的值
        String kaptchaExpected = (String) request.getSession().getAttribute(
                com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);

        //校验验证码是否正确
        if (kaptchaReceived == null || !kaptchaReceived.equals(kaptchaExpected)) {
            log.info("验证码错了");
            return "kaptcha_error";//返回验证码错误
        }
        //校验用户名密码
        // ……
        // ……
        log.info("验证码对了");
        return "success"; //校验通过返回成功
    }


}
