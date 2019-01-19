package com.peiwan.serviceimpl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.XyPersonMapper;
import com.peiwan.service.XyPersonService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.*;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class XyPersonServiceImpl extends ServiceImpl<XyPersonMapper, TPerson> implements XyPersonService {

    @Resource
    private XyPersonMapper xyPersonMapper;


    //保留两位小数点
    DecimalFormat df = new DecimalFormat("0.0");

    //查询各游戏板块主播注册人数
    @Override
    public Map game() {
        //游戏主播总人数
        int i = xyPersonMapper.AllGameCount();
        List<Map<String,Object>> count = xyPersonMapper.GameCount();
        Map<String,Object> hashMap=new HashMap<>();
        //要给默认值(不给就会报错)
        hashMap.put("lol",0.0);
        hashMap.put("juedi",0.0);
        hashMap.put("ciji",0.0);
        hashMap.put("wangzhe",0.0);
        hashMap.put("huangye",0.0);
        hashMap.put("quanjun",0.0);
        hashMap.put("diwu",0.0);
        hashMap.put("shiping",0.0);
        //人数默认值
        hashMap.put("lolCount",0);
        hashMap.put("juediCount",0);
        hashMap.put("wangzheCount",0);
        hashMap.put("cijiCount",0);
        hashMap.put("quanjunCount",0);
        hashMap.put("huangyeCount",0);
        hashMap.put("diwuCount",0);
        hashMap.put("shipingCount",0);
        for (Map<String, Object> map : count) {
            String s =map.get("g_name").toString();
            Integer i1=Integer.parseInt(map.get("shu").toString());
            String format = df.format((float) (i1 *100)/ i);
            switch (s){
                case "线上LOL":
                    //得到的是对应的人数
                    hashMap.put("lolCount",i1);
                    //得到的是对应的比例
                    hashMap.put("lol",format);
                    break;
                case "绝地求生":
                    hashMap.put("juediCount",i1);
                    hashMap.put("juedi",format);
                    break;
                case "王者荣耀":
                    hashMap.put("wangzheCount",i1);
                    hashMap.put("wangzhe",format);
                    break;
                case "刺激战场":
                    hashMap.put("cijiCount",i1);
                    hashMap.put("ciji",format);
                    break;
                case "全军出击":
                    hashMap.put("quanjunCount",i1);
                    hashMap.put("quanjun",format);
                    break;
                case "荒野行动":
                    hashMap.put("huangyeCount",i1);
                    hashMap.put("huangye",format);
                    break;
                case "第五人格":
                    hashMap.put("diwuCount",i1);
                    hashMap.put("diwu",format);
                    break;
                case "视频":
                    hashMap.put("shipingCount",i1);
                    hashMap.put("shiping",format);
                    break;
            }
        }
        System.out.println("游戏人数："+hashMap);
        return hashMap;
    }

    //查询各娱乐板块主播注册人数
    @Override
    public Map Yu() {
        //娱乐主播总人数
        int i = xyPersonMapper.AllYuCount();
        List<Map<String,Object>> count = xyPersonMapper.YuCount();
        Map<String,Object> hashMap=new HashMap<>();
        //指定默认值不然报错
        hashMap.put("shengyou",0.0);
        hashMap.put("hongshui",0.0);
        hashMap.put("xianshang",0.0);
        hashMap.put("jiaoxing",0.0);
        hashMap.put("xuni",0.0);
        hashMap.put("shengyin",0.0);
        //人数默认值
        hashMap.put("shengyouCount",0);
        hashMap.put("hongshuiCount",0);
        hashMap.put("xianshangCount",0);
        hashMap.put("jiaoxingCount",0);
        hashMap.put("xuniCount",0);
        hashMap.put("shengyinCount",0);
        for (Map<String, Object> map : count) {
            String s =map.get("g_name").toString();
            Integer i1=Integer.parseInt(map.get("shu").toString());
            String format = df.format((float) (i1 *100)/ i);
            switch (s){
                    case "声优聊天":
                        //得到的是对应的人数
                        hashMap.put("shengyouCount",i1);
                        //得到的是对应的比例
                        hashMap.put("shengyou",format);
                        break;
                    case "哄睡觉":
                        hashMap.put("hongshuiCount",i1);
                        hashMap.put("hongshui",format);
                        break;
                    case "线上歌手":
                        hashMap.put("xianshangCount",i1);
                        hashMap.put("xianshang",format);
                        break;
                    case "叫醒":
                        hashMap.put("jiaoxingCount",i1);
                        hashMap.put("jiaoxing",format);
                        break;
                    case "虚拟恋人":
                        hashMap.put("xuniCount",i1);
                        hashMap.put("xuni",format);
                        break;
                    case "声音鉴定":
                        hashMap.put("shengyinCount",i1);
                        hashMap.put("shengyin",format);
                        break;
            }
        }
        System.out.println("娱乐人数："+hashMap);
        return hashMap;
    }

    //日志模糊查询PPerson加分页
    @Override
    public IPage<TPerson> queryGamePage(Page<TPerson> page,TPerson pPerson,String minTime, String maxTime) {
        //默认最小时间（时间都转换成了int）
        int min=0;
        //最大默认值（也就是可以到3019-01-11年注册的人都能查出来）
        int max=30190111;
        //如果前台传过来的有值的话就用前台传的值
        if(minTime!=null&&minTime!=""){
            min=Integer.parseInt(minTime);
        }
        if (maxTime!=null&&maxTime!=""){
            max=Integer.parseInt(maxTime);
        }
        QueryWrapper<TPerson> wrapper = new QueryWrapper<>();
        List<TPerson> pPeople = xyPersonMapper.selectP();
        List list=new ArrayList<>();
        for (TPerson person : pPeople) {
            int time=Integer.parseInt(person.getPersonCreatetime().replaceAll("-", ""));
            if(min<=time&&time<max){
                //查询符合某一时间段的用户
                String personCreatetime = person.getPersonCreatetime();
                list.add(personCreatetime);
                System.out.println("符合条件的人："+person.getPersonName());
            }
        }
        //这个是避免一个（如果查询日期为空的话它会把所有的数据查出来）的bug
        if(list.size()==0){
            wrapper.eq("person_createtime","0");
        }
        wrapper.in("person_createtime",list);
        wrapper.like("person_name",pPerson.getPersonName());
        IPage<TPerson> PPerson = xyPersonMapper.selectPage(page,wrapper);
        return PPerson;
    }



    //根据pid删除日志
    @Override
    public Boolean delete(Integer id) {
        int delete=0;
        boolean Panduan=false;
        delete = xyPersonMapper.delete(id);
        //如果删除数据成功就返回true
        if(delete!=0){
            Panduan=true;
        }
        return Panduan;
    }

    //根据pid查询用户详情
    @Override
    public TPerson searchPerson(int pid) {
        TPerson pPerson = xyPersonMapper.selectById(pid);
        return pPerson;
    }


    public XyPersonMapper getXyPersonMapper() {
        return xyPersonMapper;
    }

    public void setXyPersonMapper(XyPersonMapper xyPersonMapper) {
        this.xyPersonMapper = xyPersonMapper;
    }

}
