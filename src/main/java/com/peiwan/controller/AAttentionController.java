package com.peiwan.controller;


import com.peiwan.bean.AAttention;
import com.peiwan.dao.AAttentionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

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



//  主页
    @RequestMapping("/toIndex")

    public ModelAndView toIndex(){
        return new ModelAndView("index");
    }


//   登陆

    @RequestMapping("/toAddLogin")
    public ModelAndView toAdd_login(){
        return new ModelAndView("add_login");
    }


//    注册
    public ModelAndView toAdd_enroll(){
        return new ModelAndView("add_enroll");
    }

//  找回密码





}
