package com.peiwan.controller;

import com.peiwan.bean.PPerson;
import com.peiwan.service.AAttentionService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


/**
 * 见名知意  用来测试项目的运行
 * User: 张家明
 *
 * @author LiXuekai on 2019/1/12/23:50
 */
@Controller
public class TestController {

    @Resource
    private AAttentionService aAttentionService;

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
     * 登录页面
     */
    @RequestMapping("/tocheshi")
    public String tocheshi(){
        return "cheshi";
    }

    /**
     * 未授权显示页面
     */
    @RequestMapping("/toAccredit")
    public String toAccredit(){
        return "accredit";
    }

    @RequestMapping("/tologint")
    public String logint(){
        Subject subject = SecurityUtils.getSubject();
        return "/MyIndex";
    }


//
  @RequestMapping("/toIndex")
   public ModelAndView toIndex(HttpSession session){
      System.out.println(session.isNew());
      ModelAndView modelAndView =new ModelAndView();
      if (session.isNew()){
          modelAndView.setViewName("/toLogin");
      }else {
          //数据库获取的值
          PPerson namepperson = (PPerson) session.getAttribute("namepperson");
          System.out.println(namepperson.getPersonName());
          modelAndView.addObject("namepperson",namepperson);
          session.setAttribute("namepperson",namepperson);
          modelAndView.setViewName("index");
      }
      return modelAndView;
  }


    /**
     * 用户名的异步检查
     * 张家明
     * 开始
     */
    @RequestMapping("/Yname")
    @ResponseBody
    public Map Yname(String personName){
        //存放返回的数据
        Map map=new HashMap();
        //
        String ippersonname = aAttentionService.ippersonname(personName);
        map.put("ippersonname",ippersonname);
        return map;
    }

    /**
     * 用户名的异步检查
     * 张家明
     * 结束
     */

    /**
     * 密码的异步检查
     * 张家明
     * 开始
     */

    @RequestMapping("/Ypwd")
    @ResponseBody
    public Map Ypwd(String personName,String personPwd){
        //存放返回的数据
        Map map=new HashMap();
        //
        String ippersonpwd = aAttentionService.ippersonpwd(personName, personPwd);
        System.out.println(ippersonpwd);
        map.put("ippersonpwd",ippersonpwd);
        return map;
    }


    /**
     * 密码的异步检查
     * 张家明
     * 开始
     */




    /**
     *  登录的业务处理（登陆按钮的fom表单提交）
     *  张家明
     *  开始
     */
    @RequestMapping("/logins")
    public String logins(HttpSession session,PPerson pPerson,Model model){
                /**
                 * 使用Shiro编写认证操作
                 */
                //1.获取Subject
                Subject subject = SecurityUtils.getSubject();
                String personName = pPerson.getPersonName();
                String personPwd = pPerson.getPersonPwd();
                //2.封装用户数据
                UsernamePasswordToken token = new UsernamePasswordToken(personName,personPwd);
                //3.执行登录方法
                try {
                    //没有异常登录成功
                    subject.login(token);
                    PPerson namepperson = aAttentionService.namepperson(pPerson);
                    session.setAttribute("namepperson",namepperson);
                    return "redirect:/toIndex";

                }catch (UnknownAccountException e){
                    //出现异常登录失败
//            e.printStackTrace();
                    model.addAttribute("msg","用户名不存在");
                    return "login";
                }catch (IncorrectCredentialsException e){
                    model.addAttribute("msg","密码错误");
                    return "login";
                }
    }
    /**
     *  登录的业务处理（登陆按钮的fom表单提交）
     *  张家明
     *  结束
     */






}
