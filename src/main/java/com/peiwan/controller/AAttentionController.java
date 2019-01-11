package com.peiwan.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.GService;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
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
public class AAttentionController {

    @Resource
    private AAttentionMapper attentionMapper;

    @Resource
    private AAttentionService attentionService;

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
        System.out.println("进来了吗？"+p);

        PPerson person = attentionService.selectPersonByNameAndPwd(p);
        System.out.println("数据库查到："+ person);
        if ( person == null){
            return new ModelAndView("login");
        }else {
            return new ModelAndView("index");
        }

    }

    //主播列表
    @RequestMapping("/addPage")
    public Object getPage(){
        Page<Map<String, Object>> page = attentionService.selectPersonList(1, 2);
        System.out.println("controller:"+page);
        List<Map<String, Object>> records = page.getRecords();
        return records;
    }




    //根据昵称和Id查询主播
    @RequestMapping("/searchPerson")
    public List<PPerson> searchPerson(String personNickname,Integer pid){
        PPerson person = new PPerson();
        person.setPersonNickname(personNickname);
        person.setPid(pid);
        List<PPerson> personList = attentionService.selectPersonByNameId(person);
        System.out.println("数据库查到的"+personList);
        return personList;
    }

    //测试迷糊查询
    @RequestMapping("/toList")
    public ModelAndView chaxun(){
        return new ModelAndView("user_list");
    }


    public AAttentionMapper getAttentionMapper() {
        return attentionMapper;
    }

    public void setAttentionMapper(AAttentionMapper attentionMapper) {
        this.attentionMapper = attentionMapper;
    }

    public AAttentionService getAttentionService() {
        return attentionService;
    }

    public void setAttentionService(AAttentionService attentionService) {
        this.attentionService = attentionService;
    }
}
