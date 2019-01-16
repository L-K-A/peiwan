package com.peiwan.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.ZYFMapper;
import com.peiwan.service.ZYFService;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
    private ZYFMapper attentionMapper;

    @Resource
    private ZYFService attentionService;

    //首页
    @RequestMapping("/toIndex")
    public ModelAndView index(){
        return new ModelAndView("index");
    }


    //注册页面
    @RequestMapping("/toRegister")
    public ModelAndView register(){
        return new ModelAndView("register");
    }


    //登录页面
    @RequestMapping("/toLogin")
    public ModelAndView login(){
      return new ModelAndView("login");
    }


    //注册
    @RequestMapping("/addRegister")
    public ModelAndView addRegister(HttpServletRequest request){
        String personTel = request.getParameter("person_tel");
        String personNickname = request.getParameter("person_nickname");
        String personName = request.getParameter("person_name");
        String personPwd = request.getParameter("person_pwd");
        
        PPerson pers = new PPerson();
        pers.setPersonTel(personTel);
        pers.setPersonNickname(personNickname);
        pers.setPersonName(personName);
        pers.setPersonPwd(personPwd);

        attentionMapper.insert(pers);
        return new ModelAndView("login");
    }

    //登录
    @RequestMapping("/addLogin")
    public ModelAndView login(String personName, String personPwd){
        PPerson p= new PPerson();
        p.setPersonName(personName);
        p.setPersonPwd(personPwd);

        PPerson person = attentionService.selectPersonByNameAndPwd(p);
        System.out.println("数据库查到："+ person);
        if ( person == null){
            return new ModelAndView("login");
        }else {
            return new ModelAndView("index");
        }

    }

    //主播列表
    @RequestMapping("/getPersonList")
    public Map<String,Object> getPage(int curPage){
        Page<Map<String, Object>> page = attentionService.selectPersonList(curPage);
        List<Map<String, Object>> records = page.getRecords();
        Map map = new HashMap();
        map.put("data",records);
        System.out.println("数据库查到的:"+map);
        return map;
    }


    //根据昵称和Id模糊查询主播
    @RequestMapping("/searchPerson")
    public Map<String,Object> searchPerson(String personNickname,Integer pid){
        PPerson person = new PPerson();
        person.setPersonNickname(personNickname);
        person.setPid(pid);
        List<Map<String, Object>> searchPersonList = attentionService.selectPersonByNameId(person);
        Map map = new HashMap();
        map.put("searchPersonList",searchPersonList);
        System.out.println("数据库查到的:"+map);
        return map;
    }


    //热度榜查询主播订单数：先按照订单数排序，再查询主播详细信息
    @RequestMapping("/getOrderCountList")
    public Map<String,Object> getOrderList(int curPage){
        Page<Map<String, Object>> page = attentionService.selectPersonOrder(curPage);
        List<Map<String, Object>> records = page.getRecords();
        System.out.println("所有数据"+records);
        Map map = new HashMap();
        map.put("data",records);
        System.out.println("controller:"+map);
        return map;
    }

    //首页导航栏模糊查询跳转到search页面
    @RequestMapping("/toSearch")
    public ModelAndView list(){
        return new ModelAndView("search");
    }


    //测试主播列表查询
    @RequestMapping("/toList")
    public ModelAndView select(){
        return new ModelAndView("orderList");
    }






    public ZYFMapper getAttentionMapper() {
        return attentionMapper;
    }

    public void setAttentionMapper(ZYFMapper attentionMapper) {
        this.attentionMapper = attentionMapper;
    }

    public ZYFService getAttentionService() {
        return attentionService;
    }

    public void setAttentionService(ZYFService attentionService) {
        this.attentionService = attentionService;
    }
}
