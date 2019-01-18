package com.peiwan.controller;


import com.peiwan.dao.ZjmLoginMapper;
import com.peiwan.serviceimpl.ZjmLoginServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@RestController
public class ZjmLoginController {

    @Resource
    private ZjmLoginMapper zjmLoginMapper;

    @Resource
    private ZjmLoginServiceImpl aAttentionService;

    //    主页
    @RequestMapping({"/", "/MyIndex"})
    public ModelAndView MyIndex() {
        return new ModelAndView("index");
    }

//
////  业务主页
//    @RequestMapping("/toIndex")
//    public ModelAndView toIndex(HttpSession session,TPerson TPerson){
//
//        //取session的值
//        TPerson sqlLoginTPerson = (TPerson) session.getAttribute("sqlLoginTPerson");
//        //数据库获取的值
//        TPerson nameTPerson = (TPerson) session.getAttribute("nameTPerson");
//        System.out.println(nameTPerson.getPersonName());
//        ModelAndView modelAndView =new ModelAndView();
////        modelAndView.addObject("nameTPerson",nameTPerson);
//        session.setAttribute("nameTPerson",nameTPerson);
//        modelAndView.setViewName("index");
//        return modelAndView;
//    }


    // 登录
    @RequestMapping("/toLogin")
    public ModelAndView tologin() {
        return new ModelAndView("login");
    }

    // 注册
    @RequestMapping("/toRegister")
    public ModelAndView toregister() {
        return new ModelAndView("register");
    }

/*
//  链接数据库进行登陆业务(逻辑  根据用户名和密码查询数据的所有信息  两个都正确跳到首页 并且把用户名传到首页)
    @RequestMapping("/sqlLogin")
    public ModelAndView sqlLogin(HttpSession session, TPerson TPerson){
        //@RestController 反回的都是json格式  所有需要转换一下
        ModelAndView modelAndView = new ModelAndView();
        //更具获取的用户名和密码 进行校验
        TPerson nameTPerson = aAttentionService.nameTPerson(TPerson);

        //校验
        if (nameTPerson==null){
            modelAndView.setViewName("redirect:toLogin");
            return modelAndView;
        }else {
            //把从页面获取的值重定向到toIndex这个方法中
            session.setAttribute("sqlLoginTPerson",TPerson);
            //把从数据库查到的值重定向到toIndex这个方法中
            session.setAttribute("nameTPerson",nameTPerson);
            modelAndView.setViewName("redirect:toIndex");
            return modelAndView;
        }
    }
*/


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
//    public ModelAndView touser(TPerson TPerson){
//
//        List<TPerson> nameTPerson = aAttentionService.nameTPerson(TPerson);
//        for (TPerson person : nameTPerson) {
//            System.out.println(person);
//        }
//        ModelAndView modelAndView = new ModelAndView();
//        TPerson qTPerson = zjmLoginMapper.selectById(1);
//        modelAndView.setView(new MappingJackson2JsonView());
//        modelAndView.addObject("TPerson",qTPerson);
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
//        List<TPerson> addTPerson = aAttentionService.addTPerson(1);
//        modelAndView.setView(new MappingJackson2JsonView());
//        modelAndView.addObject("addTPerson",addTPerson);
//        return modelAndView;
//    }
}
