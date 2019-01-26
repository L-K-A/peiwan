package com.peiwan.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.IYjhAccountMapper;
import com.peiwan.dao.IYjhOrderMapper;
import com.peiwan.dao.IYjhPersonMapper;
import com.peiwan.service.IYjhAccountService;
import com.peiwan.service.IYjhOrderService;
import com.peiwan.service.IYjhPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Author YJH
 * @ClassName UserManagerController
 * @Date 2019/1/4 12:06
 */
@RestController
public class YjhUserController {

@Resource
private IYjhPersonMapper personMapper;

@Resource
private IYjhPersonService personService;

@Resource
private IYjhOrderService indentService;

@Autowired
private IYjhOrderMapper orderMapper;

@Resource
private IYjhAccountService accountService;

@Resource
private IYjhAccountMapper accountMapper;

    /**
     * 跳转主页
    * @Author : YJH
    * @Date : 2019/1/21  14:54
    * @Parm :
    * @Return :
    */

    @RequestMapping("/index")
    public ModelAndView toIndex(){
        return new ModelAndView("index.html");
    }

    @RequestMapping("/welcome")
    public ModelAndView toWelcome(){
        return new ModelAndView("welcome.html");
    }

    /**
     * 用户订单跳转
    * @Author : YJH
    * @Date : 2019/1/21  14:54
    * @Parm :
    * @Return :
    */
    @RequestMapping("/pord")
    public ModelAndView toin(int pid){
        /*System.out.println(pid);*/
        return new ModelAndView("person-indent.html","pid",pid);
    }
    /**
     * 用户账户跳转
     * @Author : YJH
     * @Date : 2019/1/21  14:54
     * @Parm :
     * @Return :
     */
    @RequestMapping("/pacc")
    public ModelAndView tacc(int pid){
        /*System.out.println(pid);*/
        return new ModelAndView("person-account.html","pid",pid);
    }

    /**
     * 获取用户列表
    * @Author : YJH
    * @Date : 2019/1/15  11:04
    * @Parm :
    * @Return :
    */
    @RequestMapping("/per")
    public ModelAndView toUser() {
        return new ModelAndView("person-list.html");
    }
    @RequestMapping("/userList")
    public Map queryUserList(int pageCurrent, int pageSize, TPerson pPerson){
        Page<TPerson> page = new Page<>(pageCurrent,pageSize);
        IPage<TPerson> iPage = personService.page(page,pPerson);
        /*得到用户数据*/
        List<TPerson> pPersonList = iPage.getRecords();
        Map map = new HashMap();
        map.put("page",pPersonList);
        /*System.out.println(page);*/
        /*用户总条数*/
        map.put("pageNum",iPage.getTotal());
        /*用户总页数*/
        map.put("totalPage",iPage.getPages());
        return map;
    }

    /**
     *
     * 根据用户id删除用户
    * @Author : YJH
    * @Date : 2019/1/14  16:06
    * @Parm :
    * @Return :
    */
    @RequestMapping("/delById")
    public String delById(Integer pid){
        boolean b = personService.removeById(pid);
        if(b){
            System.out.println("删除成功!");
        }
        return b+"";
    }

    /**
     * 根据用户id获取账户列表
    * @Author : YJH
    * @Date : 2019/1/15  11:04
    * @Parm :
    * @Return :
    */
    @RequestMapping("/accList")
    public Map queryAccList(Integer id,int pageSize,int pageCurrent){
        Map map = new HashMap<>();
        Page page = new Page<>(pageCurrent,pageSize);
        Page page1 = page.setRecords(accountMapper.selMoneyById(id,page));
        /*System.out.println(page1.getRecords());*/
        map.put("result",page1.getRecords());
        map.put("totalPage",page1.getPages());
        System.out.println(page1);
        /*map.put("totalPage",page1.getPages());
        map.put("pageNum",page1.getTotal());*/
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
    public Map queryOrdList(Integer id,int pageCurrent,int pageSize){
        Map map = new HashMap<>();
        Page page = new Page<>(pageCurrent,pageSize);
        Page page1 = page.setRecords(orderMapper.selOrdById(id,page));
        /*System.out.println(page1.getRecords());*/
        map.put("result",page1.getRecords());
        map.put("totalPage",page1.getPages());
        /*map.put("pageNum",page1.getTotal());*/
        return map;
    }










    public IYjhPersonService getPersonService() {
        return personService;
    }

    public void setPersonService(IYjhPersonService personService) {
        this.personService = personService;
    }

    public IYjhOrderService getIndentService() {
        return indentService;
    }

    public void setIndentService(IYjhOrderService indentService) {
        this.indentService = indentService;
    }

    public IYjhAccountService getAccountService() {
        return accountService;
    }

    public void setAccountService(IYjhAccountService accountService) {
        this.accountService = accountService;
    }

    public IYjhAccountMapper getAccountMapper() {
        return accountMapper;
    }

    public void setAccountMapper(IYjhAccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    public IYjhPersonMapper getPersonMapper() {
        return personMapper;
    }

    public void setPersonMapper(IYjhPersonMapper personMapper) {
        this.personMapper = personMapper;
    }

    public IYjhOrderMapper getOrderMapper() {
        return orderMapper;
    }

    public void setOrderMapper(IYjhOrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }
}
