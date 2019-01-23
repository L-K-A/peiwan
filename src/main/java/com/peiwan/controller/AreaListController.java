package com.peiwan.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.service.AreaListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.text.ParseException;
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
public class AreaListController {


    @Resource
    private AreaListService als;

    @RequestMapping("/toAreaList")
    public ModelAndView fenLei(){
        System.out.println("前端页面已访问到togame的后台，返回到fenlei的前端页面");
        return new ModelAndView("arealist");
    }



    /*
    * Qsc
    * 前台传回gid的值，后台返回相应的等级分类
    * */
    @RequestMapping("/getDuanWei")
    public Map duanWei(int gid){
        List<Map<String, Object>> duanWei = als.getDuanWei(gid);
        Map<String,Object> map = new HashMap<>();
        map.put("duanWei",duanWei);
        for (Map<String, Object> stringObjectMap : duanWei) {
            System.out.println(stringObjectMap);
        }
        return map;
    }


    @RequestMapping("/getAreaList")
    public Map getCondition(Integer gid,String gdw,String psex,String sort,String hot,String newest,Integer pageNum,Integer pageSize,Double price) throws ParseException {

        System.out.println("从前台传回来的gid"+gid);
        System.out.println("从前台传回来的gdw"+gdw);
        System.out.println("从前台传回来的psex"+psex);
        System.out.println("从前台传回来的sort"+sort);
        System.out.println("从前台传回来的hot"+hot);
        System.out.println("从前台传回来的newest"+newest);
        System.out.println("从前台传回来的pagecurr:"+pageNum);
        System.out.println("从前台传回来的pagesize:"+pageSize);
        System.out.println("从前台传回来的price:"+price);

        Map<String,Object> map = new HashMap<>();
        map.put("gid",gid);
        map.put("gDw",gdw);
        map.put("psex",psex);
        map.put("sort",sort);
        map.put("hot",hot);
        map.put("newest",newest);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);
        map.put("price",price);

        Page<Map<String, Object>> page = new Page<Map<String, Object>>(pageNum,pageSize);

        Page<Map<String, Object>> mapPage = page.setRecords(als.getAreaList(map, page));
        map.put("mapPage",mapPage);

        return map;
    }


    public AreaListService getAls() {
        return als;
    }

    public void setAls(AreaListService als) {
        this.als = als;
    }
}
