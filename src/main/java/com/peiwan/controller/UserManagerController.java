package com.peiwan.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.MMomey;
import com.peiwan.bean.OOrder;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.IAccountMapper;
import com.peiwan.dao.IIndentMapper;
import com.peiwan.dao.IPersonMapper;
import com.peiwan.service.IAccountService;
import com.peiwan.service.IIndentService;
import com.peiwan.service.IPersonService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Author YJH
 * @ClassName UserManagerController
 * @Date 2019/1/4 12:06
 */
@RestController
@RequestMapping("/demo")
public class UserManagerController{


@Resource
private IPersonService personService;

@Resource
private IIndentService indentService;

@Resource
private IIndentMapper iIndentMapper;

@Resource
private IAccountService accountService;

@Resource
private IAccountMapper accountMapper;


    /**
     * 获取用户列表
    * @Author : YJH
    * @Date : 2019/1/15  11:04
    * @Parm :
    * @Return :
    */
    @RequestMapping("/toUser")
    public ModelAndView toUser() {

        return new ModelAndView("person-list");
    }


    @RequestMapping("/userList")
    public Map queryUserList(int pageCurrent, int pageSize, PPerson pPerson){

        Page<PPerson> page = new Page<>(pageCurrent,pageSize);
        IPage<PPerson> iPage = personService.page(page,pPerson);
        /*得到用户数据*/
        List<PPerson> pPersonList = iPage.getRecords();
        Map map = new HashMap();
        map.put("page",pPersonList);
        System.out.println(page);
        /*用户总条数*/
        map.put("totalPage",iPage.getTotal());
        return map;
    }

    /**
     *
     * 根据用户id删除用户信息
    * @Author : YJH
    * @Date : 2019/1/14  16:06
    * @Parm :
    * @Return :
    */
    @RequestMapping("/delById")
    public String delById(Integer pid){
        /*if(pid==null){
            return "error";
        }else {
            personService.removeById(pid);
            return "OK";
        }*/
        boolean removeById = personService.removeById(pid);
        return "removeById";

    }

    /**
     * 根据用户id获取账户列表
    * @Author : YJH
    * @Date : 2019/1/15  11:04
    * @Parm :
    * @Return :
    */
    @RequestMapping("/accList")
    public Map queryaAccList(Integer id,int pageSize,int pageCurrent){
        Map map = new HashMap<>();
        Page page = new Page<>(pageCurrent,pageSize);
        Page page1 = page.setRecords(accountMapper.selMoneyById(page, id));
        System.out.println(page1.getRecords());
        map.put("result",page1.getRecords());
        return map;
    }

    /**
     * 根据用户id获取订单列表
    * @Author : YJH
    * @Date : 2019/1/15  20:40
    * @Parm :
    * @Return :
    */
    @RequestMapping("/ordList")
    public Map queryOrdList(Integer id,int pageSize,int pageCurrent){
        Map map = new HashMap<>();
        Page page = new Page<>(pageCurrent,pageSize);
        Page page1 = page.setRecords(iIndentMapper.selOrdById(id,page));
        System.out.println(page1.getRecords());
        map.put("result",page1.getRecords());
        return map;
    }










    public IPersonService getPersonService() {
        return personService;
    }

    public void setPersonService(IPersonService personService) {
        this.personService = personService;
    }

    public IIndentService getIndentService() {
        return indentService;
    }

    public void setIndentService(IIndentService indentService) {
        this.indentService = indentService;
    }

    public IAccountService getAccountService() {
        return accountService;
    }

    public void setAccountService(IAccountService accountService) {
        this.accountService = accountService;
    }

    public IAccountMapper getAccountMapper() {
        return accountMapper;
    }

    public void setAccountMapper(IAccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    public IIndentMapper getiIndentMapper() {
        return iIndentMapper;
    }

    public void setiIndentMapper(IIndentMapper iIndentMapper) {
        this.iIndentMapper = iIndentMapper;
    }
}
