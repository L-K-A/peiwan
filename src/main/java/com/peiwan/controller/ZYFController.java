package com.peiwan.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.service.ZYFService;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
@RestController
@RequestMapping("/person")
public class ZYFController {

    @Resource
    private ZYFService zyfService;

    //首页
    @RequestMapping("/toIndex")
    public ModelAndView index(){
        return new ModelAndView("index");
    }


    //主播列表
    @RequestMapping("/getPersonList")
    public Map<String,Object> getPage(int curPage){
        Page<Map<String, Object>> page = zyfService.selectPersonList(curPage);
        List<Map<String, Object>> records = page.getRecords();
        Map map = new HashMap();
        map.put("personList",records);
        System.out.println("数据库查到的:"+map);
        return map;
    }


    //根据昵称和Id模糊查询主播
    @RequestMapping("/searchPerson")
    public Map<String,Object> searchPerson(String personNickname,Integer pid){
        TPerson person = new TPerson();
        person.setPersonNickname(personNickname);
        person.setPid(pid);
        List<Map<String, Object>> searchPersonList = zyfService.selectPersonByNameId(person);
        Map map = new HashMap();
        map.put("searchPersonList",searchPersonList);
        System.out.println("数据库查到的:"+map);
        return map;
    }
    //首页导航栏模糊查询跳转到search页面
    @RequestMapping("/toSearch")
    public ModelAndView list(){
        return new ModelAndView("search");
    }



    //热度榜 周榜：查询主播订单数，先筛选规定时间，然后按照订单数排序
    @RequestMapping("/getOrderCountList")
    public Map<String,Object> getOrderList(int curPage){
        Page<Map<String, Object>> page = zyfService.selectPersonOrder(curPage);
        List<Map<String, Object>> personOrderList = page.getRecords();
        Map map = new HashMap();
        //map.put("personOrderList",personOrderList);
        map.put("personOrderList",personOrderList);
        System.out.println("数据库查到的:"+map);
        return map;
    }
    //热度榜 总榜：查询主播总订单数
    @RequestMapping("/getOrderCountListAll")
    public Map<String,Object> getOrderListAll(int curPage){
        Page<Map<String, Object>> page = zyfService.selectPersonOrderAll(curPage);
        List<Map<String, Object>> personOrderListAll = page.getRecords();
        Map map = new HashMap();
        map.put("personOrderListAll",personOrderListAll);
        System.out.println("数据库查到的："+map);
        return map;
    }

    //测试主播列表查询
    @RequestMapping("/toList")
    public ModelAndView select(){
        return new ModelAndView("reDuBang");
    }



    public ZYFService getZyfService() {
        return zyfService;
    }

    public void setZyfService(ZYFService zyfService) {
        this.zyfService = zyfService;
    }
}
