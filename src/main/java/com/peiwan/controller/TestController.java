package com.peiwan.controller;

import com.peiwan.bean.PPerson;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



/**
 * 见名知意  用来测试项目的运行
 * User: 张家明
 *
 * @author LiXuekai on 2019/1/12/23:50
 */
@Controller
public class TestController {
    /**
     * 测试方法
     */
    @RequestMapping("/hello")
    @ResponseBody
    public String hello(){
        return "ok";
    }

    /**
     * 测试thymeleaf
     */

    @RequestMapping("/testThymeleaf")
    public String testThymeleaf(Model model){
        model.addAttribute("name","测试Thymeleaf模版的取值");
        return "test";
    }

    /**
     * 跳到增加页面
     */
    @RequestMapping("/add")
    public String add(){
        return "user/add";
    }
    /**
     * 跳到更新页面
     */
    @RequestMapping("/update")
    public String update(){
        return "user/update";
    }

    /**
     *调到登录页面
     */
    @RequestMapping("toLogin")
    public String toLogin(){
        return "login";
    }


    /**
     *  登录的业务处理
     */
    @RequestMapping("/login")
    public String login(PPerson pPerson,Model model){

        /**
         * 使用Shiro编写认证操作
         */
        //1.获取Subject
        Subject subject = SecurityUtils.getSubject();

        //2.封装用户数据
        UsernamePasswordToken token = new UsernamePasswordToken(pPerson.getPersonName(),pPerson.getPersonPwd());

        //3.执行登录方法
        try {

            //没有异常登录成功
            subject.login(token);

            return "redirect:/testThymeleaf";

        }catch (UnknownAccountException e){
            //出现异常登录失败
//            e.printStackTrace();
            model.addAttribute("msg","用户名不存在");
            return "login";
        }catch (IncorrectCredentialsException e){
            model.addAttribute("mag","密码错误");
            return "login";
        }

    }







}
