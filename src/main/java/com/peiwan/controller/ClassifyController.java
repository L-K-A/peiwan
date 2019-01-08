package com.peiwan.controller;

import com.peiwan.bean.GService;
import com.peiwan.bean.GSortDuanwei;
import com.peiwan.service.ClassifyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 12:06 2019/1/4
 * @Modify by:
 */

@RestController
public class ClassifyController {


    @Resource
    private ClassifyService cs;


    @RequestMapping("/playlist")
    public ModelAndView playList(){
        System.out.println("进入playlist控制层，返回hello页面");
        return new ModelAndView("hello");
    }

    @RequestMapping("/fenlei")
    public ModelAndView fenLei(){
        System.out.println("进入分类控制层，返回分类前台页面");
        return new ModelAndView("fenlei");
    }


    @RequestMapping("/tolist")
    public ModelAndView toList(){
        return new ModelAndView("list");
    }

    @RequestMapping("/lists")
    public Map lists(GService gid){


        GService gids = new GService();
        gids.setGid(1001);

        Map<String,Object> map = new HashMap<>();
        List<GSortDuanwei> list = cs.getList();
        List<Map<String,Object>> mapList = cs.getPidGid(gids);
        map.put("mapList",mapList);
        map.put("list",list);

        return map;
    }




    public ClassifyService getCs() {
        return cs;
    }

    public void setCs(ClassifyService cs) {
        this.cs = cs;
    }
}
