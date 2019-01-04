package com.peiwan.controller;



import com.peiwan.bean.PPerson;
import com.peiwan.dao.TeacherInfoMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

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
    public PPerson getInfo(){
        PPerson info = teacherInfoMapper.selectById(1);
        System.out.println(info.getPersonAge());
        return info;
    }


    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }

    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }
}
