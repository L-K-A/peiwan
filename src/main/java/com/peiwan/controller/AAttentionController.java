package com.peiwan.controller;


import com.peiwan.bean.AAttention;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.serviceimpl.AAttentionServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import javax.lang.model.element.UnknownElementException;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@RestController
public class AAttentionController {

    @Resource
    private AAttentionMapper aAttentionMapper;

    @Resource
    private AAttentionServiceImpl aAttentionService;

//    主页
    @RequestMapping({"/","/MyIndex"})
    public ModelAndView MyIndex(){
        return new ModelAndView("index");
    }

//  业务主页
    @RequestMapping("/toIndex")
    public ModelAndView toIndex(HttpSession session,PPerson pPerson){

        //取session的值
        PPerson sqlLoginpPerson = (PPerson) session.getAttribute("sqlLoginpPerson");
        //数据库获取的值
        PPerson namepperson = (PPerson) session.getAttribute("namepperson");
        System.out.println(namepperson.getPersonName());
        ModelAndView modelAndView =new ModelAndView();
//        modelAndView.addObject("namepperson",namepperson);
        session.setAttribute("namepperson",namepperson);
        modelAndView.setViewName("index");
        return modelAndView;
    }
// 登录
    @RequestMapping("/toLogin")
    public ModelAndView tologin(){
        return new ModelAndView("login");
    }
// 注册
    @RequestMapping("/toRegister")
    public ModelAndView toregister(){
        return  new ModelAndView("register");
    }

/*
//  链接数据库进行登陆业务(逻辑  根据用户名和密码查询数据的所有信息  两个都正确跳到首页 并且把用户名传到首页)
    @RequestMapping("/sqlLogin")
    public ModelAndView sqlLogin(HttpSession session, PPerson pPerson){
        //@RestController 反回的都是json格式  所有需要转换一下
        ModelAndView modelAndView = new ModelAndView();
        //更具获取的用户名和密码 进行校验
        PPerson namepperson = aAttentionService.namepperson(pPerson);

        //校验
        if (namepperson==null){
            modelAndView.setViewName("redirect:toLogin");
            return modelAndView;
        }else {
            //把从页面获取的值重定向到toIndex这个方法中
            session.setAttribute("sqlLoginpPerson",pPerson);
            //把从数据库查到的值重定向到toIndex这个方法中
            session.setAttribute("namepperson",namepperson);
            modelAndView.setViewName("redirect:toIndex");
            return modelAndView;
        }
    }
*/
//shiro的验证方法
    @RequestMapping("/sqlLoginShiro")
    public ModelAndView sqlLoginShiro(PPerson pPerson){
        ModelAndView model = new ModelAndView();
        /**
         * 使用Shiro编写认证操作
         */
        //1.获取Subject
        Subject subject = SecurityUtils.getSubject();
        //2.封装用户数据
        UsernamePasswordToken token = new UsernamePasswordToken(pPerson.getPersonName(),pPerson.getPersonPwd());
        //执行登陆方法
        System.out.println("ssssss");
        try {
            subject.login(token);
            //没有异常 登陆成功
            model.setViewName("redirect/MyIndex");


        } catch (UnknownElementException e) {
            model.addObject("msg","用户名不存在");
            model.setViewName("login");

        }catch (IncorrectCredentialsException e) {
            model.addObject("msg","用户密码不正确");
            model.setViewName("login");
        }
        return model;
    }






//
////    测试
//    @RequestMapping("/toce")
//    public ModelAndView toce(){
//        return new  ModelAndView("cheshi");
//    }
//
//
//    //登陆测试
//    @RequestMapping("/touser")
//    public ModelAndView touser(PPerson pPerson){
//
//        List<PPerson> namepperson = aAttentionService.namepperson(pPerson);
//        for (PPerson person : namepperson) {
//            System.out.println(person);
//        }
//        ModelAndView modelAndView = new ModelAndView();
//        PPerson qpPerson = aAttentionMapper.selectById(1);
//        modelAndView.setView(new MappingJackson2JsonView());
//        modelAndView.addObject("pPerson",qpPerson);
//        return modelAndView;
//    }
//
//
//
//
////    测试是否能连接数据库
//    @RequestMapping("/tosql")
//    public ModelAndView tosql(){
//        ModelAndView modelAndView = new ModelAndView();
//        List<PPerson> addpperson = aAttentionService.addpperson(1);
//        modelAndView.setView(new MappingJackson2JsonView());
//        modelAndView.addObject("addpperson",addpperson);
//        return modelAndView;
//    }
}
