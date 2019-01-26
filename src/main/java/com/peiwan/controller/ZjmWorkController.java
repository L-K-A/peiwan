package com.peiwan.controller;

import com.peiwan.bean.TPerson;
import com.peiwan.common.utils.PhoneFormatCheckUtils;
import com.peiwan.common.utils.TimeTools;
import com.peiwan.dao.ZjmLoginMapper;
import com.peiwan.service.ZjmLoginService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * 见名知意  用来测试项目的运行
 * User: 张家明
 *
 * @author LiXuekai on 2019/1/12/23:50
 */
@Controller
public class ZjmWorkController {

    @Resource
    private ZjmLoginService zjmLoginService;

    @Resource
    private ZjmLoginMapper zjmLoginMapper;


    /**
     * 注册业务的实现
     */
    //异步验证用户名是否存在  0 可以用 否则不可用
    @RequestMapping("/registerName")
    @ResponseBody
    public Map registerName(String personName){
        Map map = new HashMap();
        if(personName!=null){
            Integer integer = zjmLoginService.checkRegisterName(personName);
            //返回的是查询的个数  0  表示用户名不存在 可用  1 表示用户名存在
            map.put("nameState",integer);
        }
        return map;
    }





    /**
     * 手机号注册
     */
    @RequestMapping("/registers")
    public String registers(TPerson TPerson){

        if (TPerson.getPersonName()!=null||TPerson.getPersonPwd()!=null||TPerson.getPersonTel()!=null){
            boolean result= zjmLoginService.registerData(TPerson);
            if (result){
                return "mobileLogin";
            }else {
                return "register";
            }
        }else {
            return "mobileLogin.html";
        }

    }

    //    手机验证码业务
    @RequestMapping("/sendCode")
    @ResponseBody
    public Map  sendCode(String personTel){
        Map map = new HashMap();
        if(!PhoneFormatCheckUtils.isChinaPhoneLegal(personTel)){
            map.put("msg",false);
            return map;
        }
        try {
            zjmLoginService.createSmsCode(personTel);
            map.put("msg",true);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg",false);
            return map;
        }
    }

    /*
     * 普通注册
     *
     * */
    @RequestMapping("/register")
    public String register(TPerson TPerson) {
        if (TPerson.getPersonName() != null || TPerson.getPersonPwd() != null || TPerson.getPersonTel() != null) {
            Integer integer = zjmLoginService.registerInto(TPerson);
            if (integer == 1) {
                TPerson tPerson = zjmLoginMapper.iTper(TPerson.getPersonName());
                Integer pid = tPerson.getPid();
                //获取当前时间
                String currentTime = new TimeTools().currentTime();
                zjmLoginMapper.insertId(pid,currentTime);
                return "login";
            } else {
                return "register";
            }
        }
        return "register";
    }

    //检验验证码是否正确
    @RequestMapping("/Ycode")
    @ResponseBody
    public Map Ycode(String personTel,String smscode){
        Map map = new HashMap();
        boolean checkSmsCode = zjmLoginService.checkSmsCode(personTel,smscode);
        if (!checkSmsCode){
            map.put("checkSmsCode",false);
            return map;
        }
        map.put("checkSmsCode",true);
        return map;
    }


//登陆
    /**
     * 用户名的异步检查
     * 张家明
     * 开始
     */
    @RequestMapping("/Yname")
    @ResponseBody
    public Map Yname(String personName){
        //0 用户账户一定不争取   1 可以放行 去进行密码验证  -1 出现异常输入
        Map map=new HashMap();
        if(personName==null||personName==""){
            map.put("iTPersonname",-1);
            return map;
        }else{
            Integer iTPersonname = zjmLoginService.iTPersonname(personName);
            map.put("iTPersonname",iTPersonname);
            return map;
        }

    }


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
        // 0  密码和用户不正确  1 可以登陆  -1 输入异常
        if (personPwd!=null||personName!=null){
            Integer iTPersonpwd = zjmLoginService.iTPersonpwd(personName, personPwd);
            map.put("iTPersonpwd",iTPersonpwd);
            return map;
        }
        map.put("iTPersonpwd",-1);
        return map;

    }



    /**
     *  登录的业务处理（登陆按钮的fom表单提交）
     *  张家明
     *  开始
     */
    @RequestMapping("/logins")
    public String logins(TPerson TPerson,Model model){
        /**
         * 使用Shiro编写认证操作
         */
        //1.获取Subject
        Subject subject = SecurityUtils.getSubject();
        String personName = TPerson.getPersonName();
        String personPwd = TPerson.getPersonPwd();
        //2.封装用户数据
        UsernamePasswordToken token = new UsernamePasswordToken(personName,personPwd);
       if (personName!=null||personPwd!=null){
           //3.执行登录方法
           try {
               //没有异常登录成功
               subject.login(token);
               //判断当前用户是否登陆
               if(subject.isAuthenticated()==true){
                   TPerson.setPersonName(personName);
                   TPerson.setPersonPwd(personPwd);
                   //查询数据
                   TPerson nameTPerson = zjmLoginService.nameTPerson(TPerson);
                   Integer pid = nameTPerson.getPid();
                   //获取当前时间
                   String currentTime = new TimeTools().currentTime();
                   zjmLoginMapper.updatePersonLogintime(pid,currentTime);
                   if(nameTPerson.getPersonFlate()==1){
                       Session session = subject.getSession();
                       session.setAttribute("nameTPerson",nameTPerson);
                       return "redirect:/MyIndex";
                   }
                   else if(nameTPerson.getPersonFlate()==2){
                       Session session = subject.getSession();
                       session.setAttribute("nameTPerson",nameTPerson);
                       return "redirect:/index.html";//待修改
                   }else{
                       Session session = subject.getSession();
                       session.setAttribute("nameTPerson",nameTPerson);
                       return "redirect:/MyIndex";//待修改
                   }
               }
           }catch (UnknownAccountException e){
               //用户名错误
               return "redirect:/toLogin";
           }catch (IncorrectCredentialsException e){
               //密码错误
               return "redirect:/toLogin";
           }
           return "redirect:/toLogin";
       }else {
           return "redirect:/toLogin";
       }
    }


//    异步手机号登陆
/*
* 返回 0  手机号没有注册  1或者多个 手机号注册
* */
    @RequestMapping("/asyncMobile")
    @ResponseBody
    public Map asyncMobile(String personTel){
        Map map = new HashMap();
        Integer asyncMobiles = zjmLoginMapper.asyncMobiles(personTel);
        map.put("asyncMobiles",asyncMobiles);
        return map;
    }


//   手机号登陆
    @RequestMapping("/mobileRegisters")
    public String mobileRegisters(String personTel){
        Subject subject = SecurityUtils.getSubject();
        //查询数据
        TPerson tPerson = zjmLoginMapper.selectMobile(personTel);
        Integer pid=tPerson.getPid();
        //获取当前时间
        String currentTime = new TimeTools().currentTime();
        zjmLoginMapper.updatePersonLogintime(pid,currentTime);

        if(tPerson.getPersonFlate()==2){
            Session session = subject.getSession();
            session.setAttribute("nameTPerson",tPerson);
            return "redirect:/index.html";//待修改
        }else{
            Session session = subject.getSession();
            session.setAttribute("nameTPerson",tPerson);
            return "redirect:/MyIndex";//待修改
        }

    }














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
            TPerson nameTPerson = (TPerson) session.getAttribute("nameTPerson");
            System.out.println(nameTPerson.getPersonName());
            modelAndView.addObject("nameTPerson",nameTPerson);
            session.setAttribute("nameTPerson",nameTPerson);
            modelAndView.setViewName("index");
        }
        return modelAndView;
    }



}
