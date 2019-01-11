package com.peiwan;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.GSortDuanwei;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.PersonMapper;
import com.peiwan.service.ClassifyService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PeiwanApplicationTests {


    @Autowired
    private ClassifyService cs;

    private PersonMapper person;

    @Test
    public void contextLoads() {

        System.out.println("----------------------");
        List<PPerson> personList = person.selectList(null);
        for (PPerson pPerson : personList) {
            System.out.println(pPerson);
        }
    }

    @Test
    public void page(){
        Map<String,Object> map = new HashMap<>();
        map.put("gid",1001);
        GSortDuanwei gSortDuanwei = new GSortDuanwei();
        gSortDuanwei.setGid(1001);

        Page<Map<String,Object>> page = new Page<Map<String,Object>>(1,5);
//        page.setRecords(cs.seachPage(map,page));
        System.out.println(page);
//        List<Map<String, Object>> mapList = cs.seachPage(map, page);
//        for (Map<String, Object> stringObjectMap : mapList) {
//            System.out.println(stringObjectMap);
//        }
    }

}

