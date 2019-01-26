package com.peiwan.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.service.ZyfIndexService;
import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.text.ParseException;
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
public class ZyfIndexController {

    @Resource
    private ZyfIndexService zyfIndexService;

    //首页
    @RequestMapping("/toIndex")
    public ModelAndView index(){
        return new ModelAndView("index");
    }

    //头部
    @RequestMapping("/toHead")
    public ModelAndView head(){
        return new ModelAndView("head");
    }

    //尾部
    @RequestMapping("/toFoot")
    public ModelAndView foot(){
        return new ModelAndView("foot");
    }

    //跳转分类页面
    /*@RequestMapping("/toMore")
    public ModelAndView toMore(){
        return new ModelAndView("fenlei");
    }*/

    //八元专区
    @RequestMapping("/toAreaList")
    public ModelAndView fenLei(){
        System.out.println("前端页面已访问到togame的后台，返回到fenlei的前端页面");
        return new ModelAndView("arealist");
    }

    //通宵报名处
    @RequestMapping("/toTongXiao")
    public ModelAndView tongXiao(){
        return new ModelAndView("tongXiao");
    }
    //英雄训练营
    @RequestMapping("/toPractice")
    public ModelAndView lolPractice(){
        return new ModelAndView("lolPractice");
    }
    //导师涨价
    @RequestMapping("/toZhangJia")
    public ModelAndView zhangJia(){
        return new ModelAndView("zhangJia");
    }


    //根据昵称和Id模糊查询主播
    @RequestMapping("/searchPerson")
    public Map<String,Object> searchPerson(String personNickname,Integer pid){
        TPerson person = new TPerson();
        person.setPersonNickname(personNickname);
        person.setPid(pid);
        List<Map<String, Object>> searchPersonList = zyfIndexService.selectPersonByNameId(person);
        Map map = new HashMap();
        map.put("searchPersonList",searchPersonList);
        System.out.println("模糊查询:"+searchPersonList);
        return map; }
    //首页导航栏模糊查询跳转到search页面
    @RequestMapping("/toSearch")
    public ModelAndView list(){
        return new ModelAndView("search.html");
    }

    //新人推荐
    @RequestMapping("/getNewPersonList")
    public Map<String,Object> getNewList(Integer curPage,Integer pageSize){
        Page<Map<String, Object>> page = zyfIndexService.selectNewPerson(curPage, pageSize);
        List<Map<String, Object>> newPersonList = page.getRecords();
        Map map = new HashMap();
        map.put("newPersonList",newPersonList);
        System.out.println("新人列表："+newPersonList);
        return map;
    }

    //热门推荐主播列表
    @RequestMapping("/getHotPersonList")
    public Map<String,Object> getHotList(Integer curPage,Integer pageSize){
        Page<Map<String, Object>> page = zyfIndexService.selectHotPerson(curPage,pageSize);
        List<Map<String, Object>> hotPersonList = page.getRecords();
        Map map = new HashMap();
        map.put("hotPersonList",hotPersonList);
        System.out.println("热门推荐列表:"+hotPersonList);
        return map;
    }


    //魅力榜 周榜：查询主播订单数，先筛选规定时间，然后按照订单数排序
    @RequestMapping("/getOrderCountList")
    public Map<String,Object> getOrderList(int curPage,int pageSize) throws ParseException {
        Page<Map<String, Object>> page = zyfIndexService.selectPersonOrderTop(curPage,pageSize);
        Page<Map<String, Object>> page1 = zyfIndexService.selectPersonOrder(curPage, pageSize);
        List<Map<String, Object>> personOrderListTop = page.getRecords();//周榜前三
        List<Map<String, Object>> personOrderList = page1.getRecords();//周榜第四到第十
        Map map = new HashMap();
        map.put("personOrderListTop",personOrderListTop);
        map.put("personOrderList",personOrderList);
        System.out.println("周榜前三:"+personOrderListTop);
        System.out.println("周榜第四到第十："+personOrderList);
        return map;
    }

    //魅力榜 总榜：查询主播总订单数
    @RequestMapping("/getOrderCountListAll")
    public Map<String,Object> getOrderListAll(int curPage,int pageSize) throws ParseException {
        Page<Map<String, Object>> page = zyfIndexService.selectPersonOrderAllTop(curPage, pageSize);
        Page<Map<String, Object>> page1 = zyfIndexService.selectPersonOrderAll(curPage,pageSize);
        List<Map<String, Object>> personOrderListAllTop = page.getRecords();//总榜前三
        List<Map<String, Object>> personOrderListAll = page1.getRecords();//总榜第四到第十
        Map map = new HashMap();
        map.put("personOrderListAllTop",personOrderListAllTop);
        map.put("personOrderListAll",personOrderListAll);
        System.out.println("总榜前三："+personOrderListAllTop);
        System.out.println("总榜第四到第十"+personOrderListAllTop);
        return map;
    }



    //人气榜 周榜 ：先按照规定时间筛选，根据主播的接单总时长来排序
    @RequestMapping("/getTimeSumList")
    public Map<String,Object> getTimeList(int curPage,int pageSize) throws ParseException {
        Page<Map<String, Object>> page = zyfIndexService.selectPersonTimeTop(curPage,pageSize);
        Page<Map<String, Object>> page1 = zyfIndexService.selectPersonTime(curPage, pageSize);
        List<Map<String, Object>> personTimeListTop = page.getRecords();//周榜前三
        List<Map<String, Object>> personTimeList = page1.getRecords();//周榜第四到第十
        Map map = new HashMap();
        map.put("personTimeListTop",personTimeListTop);
        map.put("personTimeList",personTimeList);
        System.out.println("周榜前三:"+personTimeListTop);
        System.out.println("周榜第四到第十："+personTimeList);
        return map;
    }

    //人气榜 总榜 ：根据主播的接单总时长来排序
    @RequestMapping("/getTimeSumListAll")
    public Map<String,Object> getTimeListAll(int curPage,int pageSize) throws ParseException {
        Page<Map<String, Object>> page = zyfIndexService.selectPersonTimeAllTop(curPage, pageSize);
        Page<Map<String, Object>> page1 = zyfIndexService.selectPersonTimeAll(curPage,pageSize);
        List<Map<String, Object>> personTimeListAllTop = page.getRecords();//总榜前三
        List<Map<String, Object>> personTimeListAll = page1.getRecords();//总榜第四到第十
        Map map = new HashMap();
        map.put("personTimeListAllTop",personTimeListAllTop);
        map.put("personTimeListAll",personTimeListAll);
        System.out.println("总榜前三："+personTimeListAllTop);
        System.out.println("总榜第四到第十"+personTimeListAll);
        return map;
    }



    //富豪榜 周榜:先按照规定时间筛选，然后按照用户充值总金额排序
    @RequestMapping("/getMoneySumList")
    public Map<String,Object> getMoneyList(int curPage) throws ParseException {
        Page<Map<String, Object>> page = zyfIndexService.selectPersonMoneyTop(curPage);
        Page<Map<String, Object>> page1 = zyfIndexService.selectPersonMoney(curPage);
        List<Map<String, Object>> personMoneyListTop = page.getRecords();//周榜前三
        List<Map<String, Object>> personMoneyList = page1.getRecords();//周榜第四到第十
        Map map = new HashMap();
        map.put("personMoneyListTop",personMoneyListTop);
        map.put("personMoneyList",personMoneyList);
        System.out.println("数据库查到的："+personMoneyListTop);
        System.out.println("数据库查到的："+personMoneyList);
        return map;
    }
    //富豪榜 总榜:查询用户充值总金额
    @RequestMapping("/getMoneySumListAll")
    public Map<String,Object> getMoneyListAll(int curPage) throws ParseException {
        Page<Map<String, Object>> page = zyfIndexService.selectPersonMoneyAllTop(curPage);
        Page<Map<String, Object>> page1 = zyfIndexService.selectPersonMoneyAll(curPage);
        List<Map<String, Object>> personMoneyListAllTop = page.getRecords();//总榜前三
        List<Map<String, Object>> personMoneyListAll = page1.getRecords();//总榜第四到第十
        Map map = new HashMap();
        map.put("personMoneyListAllTop",personMoneyListAllTop);
        map.put("personMoneyListAll",personMoneyListAll);
        System.out.println("数据库查到的："+personMoneyListAllTop);
        System.out.println("数据库查到的："+personMoneyListAll);
        return map;
    }

    //测试主播列表查询
    @RequestMapping("/toList")
    public ModelAndView select(){
        return new ModelAndView("index2");
    }


    public ZyfIndexService getZyfIndexService() {
        return zyfIndexService;
    }

    public void setZyfIndexService(ZyfIndexService zyfIndexService) {
        this.zyfIndexService = zyfIndexService;
    }
}
