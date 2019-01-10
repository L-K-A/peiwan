package com.peiwan.controller;

import com.peiwan.bean.GService;
import com.peiwan.bean.GSortDuanwei;
import com.peiwan.service.ClassifyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @RequestMapping("/fenlei")
    public ModelAndView fenLei(){
        System.out.println("进入分类控制层，返回分类前台页面");
        return new ModelAndView("fenlei");
    }



    /*
    * Qsc
    * 前台传回gid的值，后台返回相应的等级分类
    * */
    @RequestMapping("/duanwei")
    public Map duanWei(int gid){
        List<Map<String, Object>> duanWei = cs.getDuanWei(gid);
        Map<String,Object> map = new HashMap<>();
        map.put("duanWei",duanWei);
        for (Map<String, Object> stringObjectMap : duanWei) {
            System.out.println(stringObjectMap);
        }
        return map;
    }


    @RequestMapping("/getCondition")
    public Map getCondition(int gid,String gdw,String psex,String sort){

        System.out.println("从前台传回来的gid"+gid);
        System.out.println("从前台传回来的gdw"+gdw);
        System.out.println("从前台传回来的psex"+psex);

        Map<String,Object> map = new HashMap<>();
        map.put("gid",gid);
        map.put("gDw",gdw);
        map.put("gsex",psex);
        map.put("sort",sort);

        List<Map<String, Object>> condition = cs.getCondition(map);

        Map<String,Object> map1 = new HashMap<>();
        map1.put("condition",condition);
        return map1;
    }




    public ClassifyService getCs() {
        return cs;
    }

    public void setCs(ClassifyService cs) {
        this.cs = cs;
    }
}
