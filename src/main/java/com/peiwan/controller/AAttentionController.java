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

    @RequestMapping("/toIndex")

    public ModelAndView toIndex(){
        return new ModelAndView("index");
    }





}
