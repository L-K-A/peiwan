package com.peiwan.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.service.XyPersonService;
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
 * @author bjlz
 * @since 2019-01-02
 */
@RestController
public class XyPersonController {
    @Resource
  private XyPersonService xyPersonService;

    /*游戏板块*/
    @RequestMapping("/charts-3")
    public ModelAndView showGame(HttpServletRequest request){
        Map count = xyPersonService.game();
        Map map=new HashMap();
        map.put("lol",count.get("lol"));
        map.put("juedi",count.get("juedi"));
        map.put("wangzhe",count.get("wangzhe"));
        map.put("ciji",count.get("ciji"));
        map.put("quanjun",count.get("quanjun"));
        map.put("huangye",count.get("huangye"));
        map.put("diwu",count.get("diwu"));
        map.put("shiping",count.get("shiping"));
        return new ModelAndView("charts-3",map);
    }

    /*娱乐板块*/
    @RequestMapping("/charts-4")
    public ModelAndView showYule(HttpServletRequest request){
        Map count = xyPersonService.Yu();
        request.setAttribute("shengyou",count.get("shengyou"));
        request.setAttribute("hongshui",count.get("hongshui"));
        request.setAttribute("xianshang",count.get("xianshang"));
        request.setAttribute("jiaoxing",count.get("jiaoxing"));
        request.setAttribute("xuni",count.get("xuni"));
        request.setAttribute("shengyin",count.get("shengyin"));
        return new ModelAndView("charts-4");
    }
    @RequestMapping("/log")
    public ModelAndView list(){
        return new ModelAndView("log");
    }
    /*日志板块模糊查询*/
    @RequestMapping("/loglist")
    public Map showlog(int pageCurrent,int pageSize,String minTime,String maxTime,TPerson pPerson){
        String min = minTime.replaceAll("-", "");
        String max = maxTime.replaceAll("-", "");
        System.out.println(min+"-"+max);
        Map map= new HashMap<>();
        Page<TPerson> page=new Page(pageCurrent,pageSize);
        IPage<TPerson> pPersonIPage = xyPersonService.queryGamePage(page,pPerson,min,max);
        List<TPerson> records = pPersonIPage.getRecords();
        map.put("page",records);
        //总页数
        map.put("totalPage",pPersonIPage.getPages());
        //总条数
        map.put("zongtiaoshu",pPersonIPage.getTotal());
        System.out.println("总条数"+map.get("zongtiaoshu"));
        return map;
    }
    //删除日志
    @RequestMapping("delete")
    public String delete(Integer pid){
        Boolean delete = xyPersonService.delete(pid);
        if (delete){
            System.out.println("删除成功！");
        }
        return delete+"";
    }
    //查用户的详情
    @RequestMapping("searchPage")
    public ModelAndView searchPerson(TPerson person){
        TPerson pPerson = xyPersonService.searchPerson(person.getPid());
        Map map = new HashMap<>();
        map.put("data",pPerson);
        return new ModelAndView("search",map);
    }
    //总统计图
    @RequestMapping("/shuzhuangtu")
    public ModelAndView shuzhuangtu(){
        Map game = xyPersonService.game();
        Map yu = xyPersonService.Yu();
        Map map =new HashMap();
        //游戏主播对应人数
        map.put("lolCount",game.get("lolCount"));
        map.put("juediCount",game.get("juediCount"));
        map.put("wangzheCount",game.get("wangzheCount"));
        map.put("cijiCount",game.get("cijiCount"));
        map.put("quanjunCount",game.get("quanjunCount"));
        map.put("huangyeCount",game.get("huangyeCount"));
        map.put("diwuCount",game.get("diwuCount"));
        map.put("shipingCount",game.get("shipingCount"));
        //娱乐主播对应人数
        map.put("shengyouCount",yu.get("shengyouCount"));
        map.put("hongshuiCount",yu.get("hongshuiCount"));
        map.put("xianshangCount",yu.get("xianshangCount"));
        map.put("jiaoxingCount",yu.get("jiaoxingCount"));
        map.put("xuniCount",yu.get("xuniCount"));
        map.put("shengyinCount",yu.get("shengyinCount"));
        return new ModelAndView("zhuzhuangtu",map);
    }


    public XyPersonService getaAttentionService() {
        return xyPersonService;
    }

    public void setaAttentionService(XyPersonService xyPersonService) {
        this.xyPersonService = xyPersonService;
    }

}
