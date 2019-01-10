package com.peiwan.controller;


import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Controller
public class AAttentionController {


    //测试内容
    @RequestMapping("/hello")
    public ModelAndView hello() {
        return new ModelAndView("zhuBoInfo");
    }

}
