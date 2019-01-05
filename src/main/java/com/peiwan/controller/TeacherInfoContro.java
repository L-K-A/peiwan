package com.peiwan.controller;



import com.peiwan.bean.PPerson;
import com.peiwan.dao.TeacherInfoMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:00 2019/1/4
 * @Modify by:
 */
@RestController
public class TeacherInfoContro {
    @Resource
    private TeacherInfoMapper teacherInfoMapper;

    @RequestMapping("/getInfo")
    public Map getInfo(Integer pid){
        HashMap<String, PPerson> map = new HashMap<>();
        PPerson info = teacherInfoMapper.selectById(pid);
        System.out.println(info);
        map.put("pperson",info);

        return map;
    }

    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }

    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }
}
