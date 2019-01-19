package com.peiwan.serviceimpl;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.Utils.AgeByBirthUtil;
import com.peiwan.dao.ClassifyMapper;
import com.peiwan.service.ClassifyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * @Author: QSC
 * @Despriction:
 * @Date:Created in 15:25 2019/1/4
 * @Modify by:
 */
@Service
public class ClassifyServiceImpl implements ClassifyService {

    @Resource
    private ClassifyMapper cm;


    public ClassifyMapper getCm() {
        return cm;
    }

    public void setCm(ClassifyMapper cm) {
        this.cm = cm;
    }


    /*
    * 点击游戏服务，根据gid得到的值
    * */
    @Override
    public List<Map<String, Object>> getDuanWei(int gid) {

        List<Map<String, Object>> duanWei = cm.getDuanWei(gid);

        return duanWei;
    }


    /*
    * 根据游戏服务、等级分类、性别分类
    * */
    @Override
    public List<Map<String, Object>> getCondition(Map map,Page page) throws ParseException {
        List<Map<String, Object>> condition = cm.getCondition(map,page);
        /*将出生日期进行转换为年龄进行显示（只计算年份，不包含月和日）*/
        /*
        * List<Map<String, Object>> 类型更改map中指定key的Value的值时，不能使用增强for，需要遍历List，所以需要下标获取其中的值，即Map
        * Map.put 将指定的值与此映射中的指定键关联。如果此映射以前包含一个该键的映射关系，则用指定值替换旧值；
        * */
        for (int i=0;i<condition.size();i++) {
            String personBirthday = (String) condition.get(i).get("person_birthday");
            int age = AgeByBirthUtil.getAgeByBirth(personBirthday);
            String s = String.valueOf(age);
            condition.get(i).put("person_birthday",s);
            System.out.println(condition.get(i).get("person_birthday"));

        }
        return condition;
    }

    /*@Override
    public List<Map<String, Object>> seachPage(Map map, Page page) {

        List<Map<String, Object>> mapList = cm.seachPage(map, page);

        return mapList;
    }*/
}
