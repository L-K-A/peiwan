package com.peiwan.controller;


import com.peiwan.bean.AAttention;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.serviceimpl.AAttentionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
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

//  主页
    @RequestMapping({"/","/toIndex"})
    public ModelAndView toIndex(PPerson pPerson){
        return new ModelAndView("index");
    }
// 登录
    public ModelAndView to
// 注册









//    测试
    @RequestMapping("/toce")
    public ModelAndView toce(){
        return new  ModelAndView("cheshi");
    }


    //登陆测试
    @RequestMapping("/touser")
    public ModelAndView touser(PPerson pPerson){

        List<PPerson> namepperson = aAttentionService.namepperson(pPerson);
        for (PPerson person : namepperson) {
            System.out.println(person);
        }
        ModelAndView modelAndView = new ModelAndView();
        PPerson qpPerson = aAttentionMapper.selectById(1);
        modelAndView.setView(new MappingJackson2JsonView());
        modelAndView.addObject("pPerson",qpPerson);
        return modelAndView;
    }




//    测试是否能连接数据库
    @RequestMapping("/tosql")
    public ModelAndView tosql(){
        ModelAndView modelAndView = new ModelAndView();
        List<PPerson> addpperson = aAttentionService.addpperson(1);
        modelAndView.setView(new MappingJackson2JsonView());
        modelAndView.addObject("addpperson",addpperson);
        return modelAndView;
    }
}
